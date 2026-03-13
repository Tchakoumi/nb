import type { SupportedLocale } from "@/lib/i18n";

const WHATSAPP_BASE_URL = process.env.WHATSAPP_BASE_URL!;

const WHATSAPP_API_URL = `${WHATSAPP_BASE_URL}/api/v1/message/sendText`;
const WHATSAPP_CHECK_URL = `${WHATSAPP_BASE_URL}/api/v1/chat/hasWhatsapp`;

export async function checkHasWhatsapp(phone: string): Promise<boolean> {
  const apiKey = process.env.WHATSAPP_API_KEY;
  if (!apiKey) {
    console.warn("[whatsapp] WHATSAPP_API_KEY is not set — skipping check.");
    return false;
  }

  const digits = phone.replace(/\D/g, "");

  try {
    const res = await fetch(WHATSAPP_CHECK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ whatsappNumbers: [digits] }),
    });

    if (!res.ok) {
      console.error(
        `[whatsapp] hasWhatsapp check failed for ${phone}: ${res.status} ${res.statusText}`
      );
      return false;
    }

    const data = await res.json();
    const results = Array.isArray(data?.body) ? data.body : [];
    if (results.length > 0) {
      return !!results[0]?.exists;
    }
    return false;
  } catch (error) {
    console.error("[whatsapp] Error checking hasWhatsapp:", error);
    return false;
  }
}

const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL!;
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL!;

const welcomeMessages: Record<SupportedLocale, (firstName: string) => string> = {
  en: (firstName) =>
    `Hey ${firstName}! Welcome to *Nomad Braid* 🎉\n\n` +
    `Your spot on the waitlist is confirmed. ` +
    `We'll reach out here as soon as we go live — with early access and exclusive launch offers.\n\n` +
    `Follow us in the meantime:\n` +
    `📸 Instagram: ${INSTAGRAM_URL}\n` +
    `🎵 TikTok: ${TIKTOK_URL}\n\n` +
    `Save this contact so you can follow our progress too — we'll be posting updates on our WhatsApp status.\n\n` +
    `Stay tuned!`,
  fr: (firstName) =>
    `Hey ${firstName} ! Bienvenue chez *Nomad Braid* 🎉\n\n` +
    `Ta place sur la liste d'attente est confirmée. ` +
    `On te contactera ici dès le lancement — avec un accès prioritaire et des offres exclusives.\n\n` +
    `Suis-nous en attendant :\n` +
    `📸 Instagram : ${INSTAGRAM_URL}\n` +
    `🎵 TikTok : ${TIKTOK_URL}\n\n` +
    `Enregistre ce contact pour suivre notre progression toi aussi — on publiera des nouveautés sur notre statut WhatsApp.\n\n` +
    `À très vite !`,
};

export type WhatsAppResult =
  | { sent: true }
  | {
      sent: false;
      reason: "no_api_key" | "not_whatsapp" | "api_error" | "network_error";
      detail?: string;
    };

export function mapWhatsAppResultToStatus(
  result: WhatsAppResult
): { status: "sent" | "not_whatsapp" | "api_error" | "network_error" | "error"; detail?: string } {
  if (result.sent) {
    return { status: "sent" };
  }

  if (result.reason === "no_api_key") {
    // Treat missing API key as a generic error for DB tracking purposes.
    return { status: "error", detail: result.detail };
  }

  return { status: result.reason, detail: result.detail };
}

export async function sendWelcomeWhatsApp(
  phone: string,
  firstName: string,
  locale: SupportedLocale
): Promise<WhatsAppResult> {
  const apiKey = process.env.WHATSAPP_API_KEY;
  if (!apiKey) {
    console.warn("[whatsapp] WHATSAPP_API_KEY is not set — skipping welcome message.");
    return { sent: false, reason: "no_api_key" };
  }

  const hasWhatsapp = await checkHasWhatsapp(phone);
  if (!hasWhatsapp) {
    console.log(`[whatsapp] Skipping welcome message for non-WhatsApp number: ${phone}`);
    return { sent: false, reason: "not_whatsapp" };
  }

  const text = welcomeMessages[locale](firstName);

  try {
    const res = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ number: phone, text }),
    });

    if (!res.ok) {
      const detail = `${res.status} ${res.statusText}`;
      console.error(`[whatsapp] Failed to send welcome message to ${phone}: ${detail}`);
      return { sent: false, reason: "api_error", detail };
    }

    console.log(`[whatsapp] Welcome message sent to ${phone} (${locale})`);
    return { sent: true };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[whatsapp] Error sending welcome message:", error);
    return { sent: false, reason: "network_error", detail };
  }
}
