export type SupportedLocale = "en" | "fr";

const DEFAULT_LOCALE: SupportedLocale = "en";

export function resolveInitialLocale(
  acceptLanguageHeader: string | null,
  cookieLocaleRaw?: string
): SupportedLocale {
  const cookieLocale = cookieLocaleRaw as SupportedLocale | undefined;
  if (cookieLocale === "en" || cookieLocale === "fr") {
    return cookieLocale;
  }

  const acceptLanguage = acceptLanguageHeader;
  if (acceptLanguage) {
    const lower = acceptLanguage.toLowerCase();
    if (lower.includes("fr")) return "fr";
    if (lower.includes("en")) return "en";
  }

  return DEFAULT_LOCALE;
}

export async function getMessagesForLocale(locale: SupportedLocale) {
  const messages =
    locale === "fr"
      ? (await import("../messages/fr.json")).default
      : (await import("../messages/en.json")).default;

  return messages;
}

