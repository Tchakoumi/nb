"use client";

import { useIntl } from "react-intl";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const intl = useIntl();
  const [isPending, startTransition] = useTransition();

  const setLocale = (locale: "en" | "fr") => {
    startTransition(() => {
      document.cookie = `nb_locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
      <button
        onClick={() => setLocale("en")}
        disabled={isPending}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition-all",
          intl.locale === "en"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("fr")}
        disabled={isPending}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition-all",
          intl.locale === "fr"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        FR
      </button>
    </div>
  );
}

