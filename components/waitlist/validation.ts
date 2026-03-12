import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import type { SupportedLocale } from "@/lib/i18n";

const ALLOWED_PHONE_TYPES = new Set([
  "MOBILE",
  "FIXED_LINE",
  "FIXED_LINE_OR_MOBILE",
  "VOIP",
]);

export const GENDER_VALUES = ["MALE", "FEMALE", "NB", "OTHER"] as const;
export const genderEnum = z.enum(GENDER_VALUES);

export const STATUS_VALUES = [
  "STUDENT_NO_WORK",
  "STUDENT_ALTERNANCE",
  "INDEPENDENT",
  "WORKER",
  "JOB_SEARCH"
] as const;
export const statusEnum = z.enum(STATUS_VALUES);

export const DRESSES_TOO_VALUES = ["NO", "FULLTIME", "SIDE_GIG", "FILL_MONTH_ENDS"] as const;
export const dressesTooEnum = z.enum(DRESSES_TOO_VALUES);

export const WHO_DRESSES_VALUES = ["RELATIVE", "SALON", "TIKTOK", "INSTAGRAM"] as const;
export const whoDressesEnum = z.enum(WHO_DRESSES_VALUES);

export const COST_BRACKET_VALUES = ["NONE", "10_40", "40_80", "80_120", "GT_120"] as const;
export const costBracketEnum = z.enum(COST_BRACKET_VALUES);

export const FREQUENCY_VALUES = ["EVERY_4_WEEKS", "EVERY_3_WEEKS", "EVERY_2_WEEKS", "GT_4_WEEKS"] as const;
export const frequencyEnum = z.enum(FREQUENCY_VALUES);

export const waitlistSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    gender: genderEnum,
    email: z.string().email(),
    phone: z.string().min(3),
    isWhatsapp: z.boolean().optional().default(false),
    townDescription: z.string().min(1),
    townPlaceId: z.string().min(1),
    townCountryCode: z.string().min(2).max(2),

    dressingFrequency: frequencyEnum,
    avgDressingCostBracket: costBracketEnum,
    status: statusEnum,
    dressesToo: dressesTooEnum,
    whoDresses: whoDressesEnum,

    locale: z.custom<SupportedLocale>(),
    userAgent: z.string().optional()
  })
  .superRefine((data, ctx) => {
    const phone = parsePhoneNumberFromString(data.phone, "FR");
    if (
      !phone ||
      !phone.isValid() ||
      phone.country !== "FR" ||
      !phone.getType() ||
      !ALLOWED_PHONE_TYPES.has(phone.getType()!)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "invalid-phone"
      });
      return;
    }
  });

export type WaitlistPayload = z.infer<typeof waitlistSchema>;

