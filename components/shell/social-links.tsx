"use client";

import { useIntl } from "react-intl";

type Props = {
  layout?: "row" | "column";
};

// Simple icons since we don't have lucide for everything or custom SVGs yet
const InstagramIcon = ({ className }: { className?: string }) => (
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
    <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" />
  </svg>
);

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

const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL!;
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL!;

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
        <InstagramIcon className="h-5 w-5" />
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
    </div>
  );
}

