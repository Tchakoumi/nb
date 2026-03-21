import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { headers, cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IntlRootProvider } from "@/components/intl-root-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { getMessagesForLocale, resolveInitialLocale } from "@/lib/i18n";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Nomad Braid – Waitlist",
  description:
    "Join the Nomad Braid waitlist for bespoke afro hair, braids, wigs, nails, and makeup at home or in-salon.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const cookieStore = await cookies();

  const acceptLanguage = hdrs.get("accept-language");
  const cookieLocale = cookieStore.get("nb_locale")?.value;

  const locale = resolveInitialLocale(acceptLanguage, cookieLocale);
  const messages = await getMessagesForLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${dmSans.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <IntlRootProvider locale={locale} messages={messages}>
            {children}
          </IntlRootProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
