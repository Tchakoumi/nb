"use client";

import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { useTranslations } from "@/components/waitlist/use-translations";

export default function HomePage() {
  const { title, subtitle } = useTranslations();

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Header />
      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-2xl flex-col px-6 py-8 md:py-12 lg:px-8">
          <WaitlistForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
