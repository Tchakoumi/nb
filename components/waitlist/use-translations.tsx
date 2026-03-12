"use client";

import { useIntl } from "react-intl";

export function useTranslations() {
  const intl = useIntl();

  return {
    title: intl.formatMessage({ id: "section.hero.title" }),
    subtitle: intl.formatMessage({ id: "section.hero.subtitle" })
  };
}

