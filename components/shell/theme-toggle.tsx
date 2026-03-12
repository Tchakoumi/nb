"use client";

import { useTheme } from "next-themes";
import { useIntl } from "react-intl";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const intl = useIntl();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small timeout to avoid the synchronous setState warning, though it's standard for hydration mismatch handling
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9" />; // Placeholder to avoid layout shift
  }

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full h-9 w-9 bg-muted/30 hover:bg-muted/60"
      title={intl.formatMessage({ id: `nav.theme.${theme}` })}
    >
      {theme === 'light' && <Sun className="h-4 w-4" />}
      {theme === 'dark' && <Moon className="h-4 w-4" />}
      {theme === 'system' && <Monitor className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

