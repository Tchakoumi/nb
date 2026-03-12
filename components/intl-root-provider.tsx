"use client";

import { IntlProvider } from "react-intl";
import type { SupportedLocale } from "@/lib/i18n";
import { ReactNode } from "react";

type Props = {
  locale: SupportedLocale;
  messages: Record<string, string>;
  children: ReactNode;
};

export function IntlRootProvider({ locale, messages, children }: Props) {
  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      {children}
    </IntlProvider>
  );
}

