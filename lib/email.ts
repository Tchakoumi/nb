import type { SupportedLocale } from "@/lib/i18n";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL!;
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL!;
const LOGO_URL =
  "https://img.mailinblue.com/10792493/images/rnb/original/69b212b5bd565d9b242ad9f6.png";

export type EmailResult =
  | { sent: true; messageId: string }
  | {
      sent: false;
      reason: "no_api_key" | "api_error" | "network_error";
      detail?: string;
    };

const copy: Record<
  SupportedLocale,
  {
    subject: string;
    greeting: (firstName: string) => string;
    body: string;
    followLabel: string;
    closing: string;
    team: string;
    footer: string;
  }
> = {
  fr: {
    subject: "Bienvenue chez Nomad Braid !",
    greeting: (name) => `Hey ${name} !`,
    body: "Ta place sur la liste d'attente est confirmée. On te contactera dès le lancement — avec un accès prioritaire et des offres exclusives.",
    followLabel: "Suis-nous en attendant",
    closing: "À très vite,",
    team: "L'équipe Nomad Braid",
    footer:
      "Tu reçois cet email car tu t'es inscrit(e) sur la liste d'attente de Nomad Braid.",
  },
  en: {
    subject: "Welcome to Nomad Braid!",
    greeting: (name) => `Hey ${name}!`,
    body: "Your spot on the waitlist is confirmed. We\u2019ll reach out as soon as we go live \u2014 with early access and exclusive launch offers.",
    followLabel: "Follow us in the meantime",
    closing: "See you soon,",
    team: "The Nomad Braid Team",
    footer:
      "You\u2019re receiving this email because you signed up for the Nomad Braid waitlist.",
  },
};

function buildHtml(firstName: string, locale: SupportedLocale): string {
  const t = copy[locale];

  return `<!DOCTYPE html>
<html lang="${locale}" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="color-scheme" content="light"/>
  <meta name="supported-color-schemes" content="light"/>
  <title>${t.subject}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0; mso-table-rspace: 0; }
    img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    body { margin: 0; padding: 0; width: 100% !important; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#fdf6f1; font-family:'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <!-- Preheader (hidden) -->
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
    ${t.body}&nbsp;
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf6f1;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!-- Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:24px; overflow:hidden; box-shadow: 0 4px 24px rgba(141,43,1,0.08);">

          <!-- Top accent bar -->
          <tr>
            <td style="height:5px; background: linear-gradient(90deg, #8d2b01, #faaf40);"></td>
          </tr>

          <!-- Logo -->
          <tr>
            <td align="center" style="padding: 36px 40px 0;">
              <img src="${LOGO_URL}" alt="Nomad Braid" width="64" height="64" style="display:block; width:64px; height:64px; border-radius:12px;"/>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 28px 40px 0; text-align:center;">
              <h1 style="margin:0; font-size:26px; font-weight:700; color:#171717; line-height:1.3;">
                ${t.greeting(firstName)}
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 16px 40px 0; text-align:center;">
              <p style="margin:0; font-size:16px; line-height:1.65; color:#8a6a5c;">
                ${t.body}
              </p>
            </td>
          </tr>

          <!-- Social links -->
          <tr>
            <td style="padding: 32px 40px 0; text-align:center;">
              <p style="margin:0 0 16px; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:#8a6a5c;">
                ${t.followLabel}
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td style="padding:0 16px;">
                    <a href="${INSTAGRAM_URL}" target="_blank" style="text-decoration:none; color:#8d2b01; font-size:15px; font-weight:600;">
                      &#x1F4F8; Instagram
                    </a>
                  </td>
                  <td style="padding:0 16px;">
                    <a href="${TIKTOK_URL}" target="_blank" style="text-decoration:none; color:#8d2b01; font-size:15px; font-weight:600;">
                      &#x1F3B5; TikTok
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="padding: 36px 40px 0; text-align:center;">
              <p style="margin:0; font-size:15px; color:#171717; line-height:1.6;">
                ${t.closing}<br/>
                <strong>${t.team}</strong>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <div style="height:1px; background-color:#edc7b4;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 36px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#8a6a5c; line-height:1.5;">
                ${t.footer}
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export async function sendWelcomeEmail(
  email: string,
  firstName: string,
  locale: SupportedLocale
): Promise<EmailResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("[email] BREVO_API_KEY is not set — skipping welcome email.");
    return { sent: false, reason: "no_api_key" };
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL ?? "hello@nomadbraid.com";
  const senderName = process.env.BREVO_SENDER_NAME ?? "Nomad Braid";
  const t = copy[locale];

  try {
    const res = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email, name: firstName }],
        subject: t.subject,
        htmlContent: buildHtml(firstName, locale),
      }),
    });

    if (!res.ok) {
      const detail = `${res.status} ${res.statusText}`;
      console.error(`[email] Failed to send welcome email to ${email}: ${detail}`);
      return { sent: false, reason: "api_error", detail };
    }

    const data = await res.json();
    const messageId: string = data.messageId ?? "";
    console.log(`[email] Welcome email sent to ${email} (${locale}) messageId=${messageId}`);
    return { sent: true, messageId };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[email] Error sending welcome email:", error);
    return { sent: false, reason: "network_error", detail };
  }
}
