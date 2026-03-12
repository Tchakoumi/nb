import { parsePhoneNumberFromString } from "libphonenumber-js/max";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_PHONE_TYPES = new Set([
  "MOBILE",
  "FIXED_LINE",
  "FIXED_LINE_OR_MOBILE",
  "VOIP",
]);

export function isValidEmail(value: string): boolean {
  if (!value || value.trim().length < 3) return false;
  return EMAIL_REGEX.test(value.trim());
}

/**
 * Normalizes French phone input to E.164 with +33.
 * User enters digits (e.g. 751321131 or 06 12 34 56 78), we return +33612345678.
 */
export function normalizeFrenchPhone(digitsOnly: string): string {
  const digits = digitsOnly.replace(/\D/g, "");
  const normalized = digits.replace(/^0/, "");
  const trimmed = normalized.slice(0, 9);
  return trimmed ? "+33" + trimmed : "";
}

/**
 * Validates a +33-prefixed number is a real, reachable French personal number.
 * Uses Google's full phone metadata to reject unassigned ranges, premium-rate,
 * and toll-free numbers — only mobile, landline, and VoIP are accepted.
 */
export function isValidFrenchPhone(fullNumber: string): boolean {
  if (!fullNumber || !fullNumber.startsWith("+33")) return false;
  const phone = parsePhoneNumberFromString(fullNumber, "FR");
  if (!phone || !phone.isValid() || phone.country !== "FR") return false;
  const type = phone.getType();
  return !!type && ALLOWED_PHONE_TYPES.has(type);
}
