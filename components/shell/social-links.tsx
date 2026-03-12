"use client";

import { useIntl } from "react-intl";

import { Instagram } from "lucide-react";

type Props = {
  layout?: "row" | "column";
};

// Simple icons since we don't have lucide for everything or custom SVGs yet
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
  </svg>
);

const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL!;
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL!;
const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL!;

export function SocialLinks({ layout = "row" }: Props) {
  const intl = useIntl();

  const container =
    layout === "row"
      ? "flex flex-wrap items-center gap-4"
      : "flex flex-col items-start gap-2";

  return (
    <div className={container} aria-label={intl.formatMessage({ id: "social.followUs" })}>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-all hover:border-primary hover:text-primary hover:shadow-md"
        aria-label={intl.formatMessage({ id: "social.instagram" })}
      >
        <Instagram className="h-5 w-5" />
      </a>
      <a
        href={TIKTOK_URL}
        target="_blank"
        rel="noreferrer"
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-all hover:border-primary hover:text-primary hover:shadow-md"
        aria-label={intl.formatMessage({ id: "social.tiktok" })}
      >
        <TikTokIcon className="h-5 w-5" />
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-all hover:border-primary hover:text-primary hover:shadow-md"
        aria-label={intl.formatMessage({ id: "social.whatsapp" })}
      >
        <WhatsAppIcon className="h-5 w-5" />
      </a>
    </div>
  );
}

