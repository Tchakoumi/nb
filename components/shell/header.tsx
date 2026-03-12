"use client";

import Image from "next/image";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <Image
            src="/icon-header.png"
            alt="Nomad Braid"
            width={32}
            height={40}
            className="h-9 w-auto"
            priority
          />
          <span className="hidden font-bold tracking-tight sm:inline-block">
            Nomad Braid
          </span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

