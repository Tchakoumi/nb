"use client";

import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { TownAutocomplete } from "./town-autocomplete";
import { PhoneInput } from "./phone-input";
import { SocialLinks } from "@/components/shell/social-links";
import { isValidEmail, isValidFrenchPhone } from "@/lib/validation-helpers";
import {
  COST_BRACKET_VALUES,
  STATUS_VALUES,
  DRESSES_TOO_VALUES,
  WHO_DRESSES_VALUES,
  FREQUENCY_VALUES
} from "./validation";
import { cn } from "@/lib/utils";
import { usePersistedState } from "@/lib/use-persisted-state";
import { useHashStep } from "@/lib/use-hash-step";

const VALID_STEPS = ["read", "personal", "dressing", "done"] as const;
type Step = (typeof VALID_STEPS)[number];

type FormState = {
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "NB" | "OTHER";
  email: string;
  phone: string;
  isWhatsapp: boolean;
  townDescription: string;
  townPlaceId: string;
  townCountryCode: string;
  dressingFrequency: (typeof FREQUENCY_VALUES)[number] | null;
  avgDressingCostBracket: (typeof COST_BRACKET_VALUES)[number] | null;
  status: (typeof STATUS_VALUES)[number] | null;
  dressesToo: (typeof DRESSES_TOO_VALUES)[number] | null;
  whoDresses: (typeof WHO_DRESSES_VALUES)[number] | null;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  gender: "FEMALE",
  email: "",
  phone: "",
  isWhatsapp: false,
  townDescription: "",
  townPlaceId: "",
  townCountryCode: "",
  dressingFrequency: null,
  avgDressingCostBracket: null,
  status: null,
  dressesToo: null,
  whoDresses: null
};

export function WaitlistForm() {
  const intl = useIntl();
  const [step, setStep] = useHashStep<Step>("read", VALID_STEPS);
  const [form, setForm, clearForm] = usePersistedState<FormState>(
    "nb:waitlist:form",
    initialState
  );
  const [submitStatus, setSubmitStatus, clearSubmitStatus] = usePersistedState<
    "idle" | "success" | "duplicate" | "error"
  >("nb:waitlist:status", "idle");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [duplicateCheck, setDuplicateCheck] = useState({ email: false, phone: false });
  const [whatsappChecking, setWhatsappChecking] = useState(false);
  const [emailMxInvalid, setEmailMxInvalid] = useState(false);
  const [emailMxChecking, setEmailMxChecking] = useState(false);

  const isEmailValid = isValidEmail(form.email);
  const isPhoneValid = isValidFrenchPhone(form.phone);

  // Clear duplicate error immediately when user types
  useEffect(() => {
    setDuplicateCheck(prev => ({
      email: isEmailValid ? prev.email : false,
      phone: isPhoneValid ? prev.phone : false
    }));
  }, [form.email, form.phone, isEmailValid, isPhoneValid]);

  // Debounced check against the database
  useEffect(() => {
    if (!isEmailValid && !isPhoneValid) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/waitlist/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: isEmailValid ? form.email : undefined,
            phone: isPhoneValid ? form.phone : undefined
          })
        });
        const data = await res.json();
        if (data.ok) {
          setDuplicateCheck({
            email: !!data.emailExists,
            phone: !!data.phoneExists
          });
        }
      } catch (err) {
        // silently ignore check errors
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [form.email, form.phone, isEmailValid, isPhoneValid]);

  useEffect(() => {
    if (!isPhoneValid) {
      setForm((f) => ({ ...f, isWhatsapp: false }));
      return;
    }

    setWhatsappChecking(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/whatsapp/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: form.phone }),
        });
        const data = await res.json();
        if (data.ok) {
          setForm((f) => ({ ...f, isWhatsapp: !!data.hasWhatsapp }));
        }
      } catch {
        setForm((f) => ({ ...f, isWhatsapp: false }));
      } finally {
        setWhatsappChecking(false);
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      setWhatsappChecking(false);
    };
  }, [form.phone, isPhoneValid]);

  useEffect(() => {
    if (!isEmailValid) {
      setEmailMxInvalid(false);
      return;
    }

    setEmailMxChecking(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/email/check-mx", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email }),
        });
        const data = await res.json();
        if (data.ok) {
          setEmailMxInvalid(!data.valid);
        }
      } catch {
        setEmailMxInvalid(false);
      } finally {
        setEmailMxChecking(false);
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      setEmailMxChecking(false);
    };
  }, [form.email, isEmailValid]);

  const canGoNextPersonal =
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    isEmailValid &&
    !duplicateCheck.email &&
    !emailMxInvalid &&
    isPhoneValid &&
    !duplicateCheck.phone &&
    form.townDescription.trim().length > 0 &&
    form.townPlaceId.trim().length > 0 &&
    form.townCountryCode.trim().length === 2;

  const canSubmitDressing =
    !!form.dressingFrequency &&
    !!form.avgDressingCostBracket &&
    !!form.status &&
    !!form.dressesToo &&
    !!form.whoDresses;

  const handleSubmit = async () => {
    if (!canSubmitDressing || submitting) return;

    setSubmitting(true);
    setErrors({});

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        email: form.email,
        phone: form.phone,
        isWhatsapp: form.isWhatsapp,
        townDescription: form.townDescription,
        townPlaceId: form.townPlaceId,
        townCountryCode: form.townCountryCode,
        dressingFrequency: form.dressingFrequency!,
        avgDressingCostBracket: form.avgDressingCostBracket!,
        status: form.status!,
        dressesToo: form.dressesToo!,
        whoDresses: form.whoDresses!,
        locale: intl.locale
      };

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.status === "validation_error" && data.fieldErrors) {
        setErrors(data.fieldErrors);
        setStep("personal");
        setSubmitStatus("idle");
        return;
      }

      if (data.status === "duplicate") {
        setSubmitStatus("duplicate");
        clearForm();
        setStep("done");
        return;
      }

      if (res.ok) {
        setSubmitStatus("success");
        clearForm();
        setStep("done");

        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: ReturnType<typeof setInterval> = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          });
          confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          });
        }, 250);

        return;
      }

      setSubmitStatus("error");
      setStep("done");
    } catch {
      setSubmitStatus("error");
      setStep("done");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "read") {
      setStep("personal");
    } else if (step === "personal" && canGoNextPersonal) {
      setStep("dressing");
    } else if (step === "dressing" && canSubmitDressing && !submitting) {
      handleSubmit();
    }
  };

  const handleStartAgain = () => {
    clearForm();
    clearSubmitStatus();
    setStep("read");
  };

  if (step === "done") {
    const titleMsg =
      submitStatus === "success"
        ? intl.formatMessage({ id: "state.success.title" })
        : submitStatus === "duplicate"
        ? intl.formatMessage({ id: "state.duplicate.title" })
        : intl.formatMessage({ id: "state.error.title" });

    const bodyMsg =
      submitStatus === "success"
        ? intl.formatMessage({ id: "state.success.body" })
        : submitStatus === "duplicate"
        ? intl.formatMessage({ id: "state.duplicate.body" })
        : intl.formatMessage({ id: "state.error.body" });

    const followMsg =
      submitStatus === "success"
        ? intl.formatMessage({ id: "state.success.followPrompt" })
        : intl.formatMessage({ id: "social.followUs" });

    return (
      <div className="w-full flex flex-col items-center justify-center text-center py-4 md:py-6">
        <Image
          src="/icon.png"
          alt="Nomad Braid"
          width={80}
          height={80}
          className="mb-5 h-20 w-auto mx-auto"
        />
        <h1
          className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          style={{ color: "var(--nb-foreground)" }}
        >
          {titleMsg}
        </h1>
        <p
          className="mt-3 max-w-xl text-base leading-relaxed md:text-lg"
          style={{ color: "var(--nb-foreground)", opacity: 0.7 }}
        >
          {bodyMsg}
        </p>
        <p
          className="mt-8 max-w-md text-sm leading-relaxed"
          style={{ color: "var(--nb-foreground)", opacity: 0.5 }}
        >
          {followMsg}
        </p>
        <div className="mt-3">
          <SocialLinks layout="row" />
        </div>
        <Button
          variant="ghost"
          className="mt-6 gap-2 text-muted-foreground"
          onClick={handleStartAgain}
        >
          <RotateCcw className="h-4 w-4" />
          {intl.formatMessage({ id: "form.actions.startAgain" })}
        </Button>
      </div>
    );
  }

  return (
    <form className="w-full flex flex-col" onSubmit={handleFormSubmit}>
      <AnimatePresence initial={false}>
        {step === "read" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pb-8 pt-2 md:space-y-3 md:pb-10 md:pt-0">
              <Image
                src="/icon.png"
                alt="Nomad Braid"
                width={56}
                height={56}
                className="h-14 w-auto"
              />
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {intl.formatMessage({ id: "section.hero.title" })}
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {intl.formatMessage({ id: "section.hero.subtitle" })}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === "read" && (
          <motion.div
            key="read"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border/60 bg-card px-4 py-6 md:p-7 w-full transition-colors duration-300 hover:border-foreground/30"
          >
            <div className="space-y-5">
              <div className="space-y-3 rounded-2xl bg-muted/30 p-5 backdrop-blur-sm md:p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                  {intl.formatMessage({ id: "section.why.title" })}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {intl.formatMessage({ id: "section.why.body" })}
                </p>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  {intl.formatMessage({ id: "form.actions.registerToWaitlist" })}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "personal" && (
          <motion.div
            key="personal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border/60 bg-card px-4 py-6 md:p-7 w-full transition-colors duration-300 hover:border-foreground/30"
          >
            <div className="mb-6 flex items-center justify-between gap-4 md:mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                {intl.formatMessage({ id: "form.stepIndicator.personal" })}
              </p>
              <div className="flex gap-1">
                <div className="h-1.5 w-8 rounded-full bg-primary transition-colors" />
                <div className="h-1.5 w-8 rounded-full bg-muted transition-colors" />
              </div>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="firstName">
                  {intl.formatMessage({ id: "form.personal.firstName.label" })}
                </Label>
                <Input
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                  aria-invalid={!!errors.firstName}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">
                  {intl.formatMessage({ id: "form.personal.lastName.label" })}
                </Label>
                <Input
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lastName: e.target.value }))
                  }
                  aria-invalid={!!errors.lastName}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="gender">{intl.formatMessage({ id: "form.personal.gender.label" })}</Label>
              <select
                id="gender"
                value={form.gender}
                onChange={(e) =>
                  setForm((f) => ({ ...f, gender: e.target.value as FormState["gender"] }))
                }
                className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-2 text-base shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="FEMALE">{intl.formatMessage({ id: "form.personal.gender.female" })}</option>
                <option value="MALE">{intl.formatMessage({ id: "form.personal.gender.male" })}</option>
                <option value="NB">{intl.formatMessage({ id: "form.personal.gender.nb" })}</option>
                <option value="OTHER">{intl.formatMessage({ id: "form.personal.gender.other" })}</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">
                {intl.formatMessage({ id: "form.personal.email.label" })}
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  aria-invalid={!!errors.email || (form.email.length > 0 && !isEmailValid) || duplicateCheck.email || emailMxInvalid}
                  className={cn(
                    (errors.email || (form.email.length > 0 && !isEmailValid) || duplicateCheck.email || emailMxInvalid) &&
                      "border-red-500 focus-visible:ring-red-500/50",
                    emailMxChecking && "pr-10"
                  )}
                />
                {emailMxChecking && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 inline-block rounded-full border-2 border-primary border-t-transparent animate-spin" />
                )}
              </div>
              {((form.email.length > 0 && !isEmailValid) || errors.email) && !duplicateCheck.email && !emailMxInvalid && (
                <p className="text-xs text-red-500">
                  {intl.formatMessage({ id: "form.validation.email" })}
                </p>
              )}
              {duplicateCheck.email && (
                <p className="text-xs text-red-500">
                  {intl.formatMessage({ id: "form.validation.emailExists" })}
                </p>
              )}
              {emailMxInvalid && !duplicateCheck.email && (
                <p className="text-xs text-red-500">
                  {intl.formatMessage({ id: "form.validation.emailDomainInvalid" })}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">
                {intl.formatMessage({ id: "form.personal.phone.label" })}
              </Label>
              <PhoneInput
                id="phone"
                value={form.phone}
                onChange={(phone) => setForm((f) => ({ ...f, phone }))}
                onBlur={() => setPhoneTouched(true)}
                error={
                  duplicateCheck.phone
                    ? intl.formatMessage({ id: "form.validation.phoneExists" })
                    : errors.phone || (phoneTouched && !isPhoneValid)
                    ? intl.formatMessage({ id: "form.validation.phone" })
                    : undefined
                }
              />
              {(errors.phone || (phoneTouched && !isPhoneValid)) && !duplicateCheck.phone && (
                <p id="phone-error" className="text-xs text-red-500">
                  {intl.formatMessage({ id: "form.validation.phone" })}
                </p>
              )}
              {duplicateCheck.phone && (
                <p id="phone-error-duplicate" className="text-xs text-red-500">
                  {intl.formatMessage({ id: "form.validation.phoneExists" })}
                </p>
              )}
              {!phoneTouched && !duplicateCheck.phone && (
                <p className="text-xs text-muted-foreground">
                  {intl.formatMessage({ id: "form.personal.phone.helper" })}
                </p>
              )}
              <label
                htmlFor="isWhatsapp"
                className="mt-2 flex items-center gap-2 cursor-default select-none"
              >
                {whatsappChecking ? (
                  <span className="h-4 w-4 inline-block rounded-full border-2 border-primary border-t-transparent animate-spin" />
                ) : (
                  <input
                    id="isWhatsapp"
                    type="checkbox"
                    checked={form.isWhatsapp}
                    readOnly
                    tabIndex={-1}
                    className="h-4 w-4 rounded border-border accent-primary pointer-events-none"
                  />
                )}
                <span className="text-xs text-muted-foreground">
                  {intl.formatMessage({ id: "form.personal.isWhatsapp.label" })}
                </span>
              </label>
            </div>

            <div className="space-y-1">
              <Label htmlFor="town">
                {intl.formatMessage({ id: "form.personal.town.label" })}
              </Label>
              <TownAutocomplete
                value={form.townDescription}
                onChange={(val) =>
                  setForm((f) => ({
                    ...f,
                    townDescription: val.description,
                    townPlaceId: val.placeId,
                    townCountryCode: val.countryCode.slice(0, 2).toUpperCase()
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-end pt-3 md:pt-4">
              <Button
                type="submit"
                disabled={!canGoNextPersonal}
              >
                {intl.formatMessage({ id: "form.actions.next" })}
              </Button>
            </div>
            </div>
          </motion.div>
        )}

        {step === "dressing" && (
          <motion.div
            key="dressing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border/60 bg-card px-4 py-6 md:p-7 w-full transition-colors duration-300 hover:border-foreground/30"
          >
            <div className="mb-6 flex items-center justify-between gap-4 md:mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                {intl.formatMessage({ id: "form.stepIndicator.dressing" })}
              </p>
              <div className="flex gap-1">
                <div className="h-1.5 w-8 rounded-full bg-primary transition-colors" />
                <div className="h-1.5 w-8 rounded-full bg-primary transition-colors" />
              </div>
            </div>
            <div className="space-y-4 md:space-y-5">
            <div className="space-y-1">
              <Label htmlFor="dressingFrequency">
                {intl.formatMessage({ id: "form.dressing.frequency.label" })}
              </Label>
              <select
                id="dressingFrequency"
                value={form.dressingFrequency ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    dressingFrequency: e.target.value
                      ? (e.target.value as FormState["dressingFrequency"])
                      : null
                  }))
                }
                className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-2 text-base shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">—</option>
                {FREQUENCY_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {intl.formatMessage({ id: `form.dressing.frequency.${value.toLowerCase()}` })}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="avgCost">
                {intl.formatMessage({ id: "form.dressing.cost.label" })}
              </Label>
              <select
                id="avgCost"
                value={form.avgDressingCostBracket ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    avgDressingCostBracket: e.target.value
                      ? (e.target.value as FormState["avgDressingCostBracket"])
                      : null
                  }))
                }
                className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-2 text-base shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">—</option>
                {COST_BRACKET_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {intl.formatMessage({ id: `form.dressing.cost.${value.toLowerCase()}` })}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="status">
                {intl.formatMessage({ id: "form.dressing.status.label" })}
              </Label>
              <select
                id="status"
                value={form.status ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    status: e.target.value ? (e.target.value as FormState["status"]) : null
                  }))
                }
                className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-2 text-base shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">—</option>
                {STATUS_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {intl.formatMessage({ id: `form.dressing.status.${value.toLowerCase()}` })}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="dressesToo">
                {intl.formatMessage({ id: "form.dressing.dressesToo.label" })}
              </Label>
              <select
                id="dressesToo"
                value={form.dressesToo ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    dressesToo: e.target.value ? (e.target.value as FormState["dressesToo"]) : null
                  }))
                }
                className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-2 text-base shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">—</option>
                {DRESSES_TOO_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {intl.formatMessage({
                      id:
                        value === "NO"
                          ? "form.dressing.dressesToo.no"
                          : value === "FULLTIME"
                            ? "form.dressing.dressesToo.fulltime"
                            : value === "SIDE_GIG"
                              ? "form.dressing.dressesToo.side"
                              : "form.dressing.dressesToo.fill"
                    })}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="whoDresses">
                {intl.formatMessage({ id: "form.dressing.whoDresses.label" })}
              </Label>
              <select
                id="whoDresses"
                value={form.whoDresses ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    whoDresses: e.target.value ? (e.target.value as FormState["whoDresses"]) : null
                  }))
                }
                className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-2 text-base shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="">—</option>
                {WHO_DRESSES_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {intl.formatMessage({ id: `form.dressing.whoDresses.${value.toLowerCase()}` })}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between pt-3 md:pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("personal")}
              >
                {intl.formatMessage({ id: "form.actions.back" })}
              </Button>
              <Button
                type="submit"
                disabled={!canSubmitDressing || submitting}
              >
                {intl.formatMessage({ id: "form.actions.submit" })}
              </Button>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

