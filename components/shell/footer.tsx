"use client";

import Image from "next/image";
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
              alt="Nomad Braid"
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
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}

