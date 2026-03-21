"use client";

import Image from "next/image";
import Link from "next/link";
import { useIntl } from "react-intl";
import { SocialLinks } from "./social-links";

export function Footer() {
  const intl = useIntl();

  return (
    <footer className="border-t border-border/40 bg-background py-8 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row lg:px-8">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2">
            <Image
              src="/icon-header.png"
              alt=""
              width={20}
              height={25}
              className="h-5 w-auto"
            />
            <p className="text-sm font-semibold text-foreground">
              {intl.formatMessage({ id: "app.title" })}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {intl.formatMessage({ id: "footer.copyright" })}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground md:justify-start">
            <Link
              href="/mentions-legales"
              className="inline-flex min-h-6 items-center px-0.5 py-1.5 hover:text-primary underline-offset-4 hover:underline"
            >
              {intl.formatMessage({ id: "footer.legal.mentions" })}
            </Link>
            <span className="hidden text-border md:inline">•</span>
            <Link
              href="/politique-de-confidentialite"
              className="inline-flex min-h-6 items-center px-0.5 py-1.5 hover:text-primary underline-offset-4 hover:underline"
            >
              {intl.formatMessage({ id: "footer.legal.privacy" })}
            </Link>
            <span className="hidden text-border md:inline">•</span>
            <Link
              href="/cgu"
              className="inline-flex min-h-6 items-center px-0.5 py-1.5 hover:text-primary underline-offset-4 hover:underline"
            >
              {intl.formatMessage({ id: "footer.legal.terms" })}
            </Link>
          </div>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}

