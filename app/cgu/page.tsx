import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";

export const metadata = {
  title: "Conditions générales d’utilisation – Nomad Braid",
};

export default function CGUPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-6 py-10 md:py-14 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Conditions générales d’utilisation
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Version française – une version anglaise est disponible plus bas sur
          la page.
        </p>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">1. Objet du site</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Le site Nomad Braid a pour objet de présenter le projet Nomad Braid
            et de permettre aux personnes intéressées de s’inscrire sur une{" "}
            <strong>liste d’attente</strong> afin d’être informées du lancement
            du service et de bénéficier d’un accès prioritaire. Le site ne
            constitue pas, à ce stade, une plateforme de réservation ni un
            engagement ferme de prestation de services.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">2. Acceptation des CGU</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            L’accès et l’utilisation du site impliquent l’acceptation pleine et
            entière des présentes Conditions générales d’utilisation (CGU), des{" "}
            <a
              href="/mentions-legales"
              className="underline underline-offset-4 hover:text-primary"
            >
              Mentions légales
            </a>{" "}
            et de la{" "}
            <a
              href="/politique-de-confidentialite"
              className="underline underline-offset-4 hover:text-primary"
            >
              Politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            3. Inscription à la liste d’attente
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            L’inscription à la liste d’attente est réservée aux personnes
            majeures ou disposant de l’autorisation de leur représentant légal.
            En remplissant le formulaire, vous vous engagez à fournir des
            informations exactes, complètes et à jour.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            L’inscription à la liste d’attente ne constitue pas une réservation
            ferme ni une garantie de disponibilité d’un service à une date
            donnée. Elle nous permet de vous contacter lors du lancement du
            service Nomad Braid et de mieux comprendre vos besoins.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            4. Communications et notifications
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            En vous inscrivant sur la liste d’attente, vous acceptez que Nomad
            Braid puisse vous contacter par e-mail et/ou par WhatsApp (si votre
            numéro est éligible) pour vous informer du lancement du service, de
            l’ouverture des réservations et d’offres liées au projet Nomad
            Braid.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Vous pouvez à tout moment demander à ne plus être contacté en nous
            écrivant à{" "}
            <a
              href="mailto:info@nomadbraid.fr"
              className="underline underline-offset-4 hover:text-primary"
            >
              info@nomadbraid.fr
            </a>
            .
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            5. Comportement des utilisateurs
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            L’utilisateur s’engage à utiliser le site dans le respect des lois
            et règlements en vigueur et des présentes CGU. En particulier,
            l’utilisateur s’interdit&nbsp;:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>
              d’utiliser de fausses informations ou d’usurper l’identité d’un
              tiers ;
            </li>
            <li>
              de porter atteinte aux droits de Nomad Braid ou de tout tiers
              (droits d’auteur, marque, vie privée, etc.) ;
            </li>
            <li>
              de tenter de porter atteinte au bon fonctionnement ou à la
              sécurité du site (intrusions, attaques, etc.).
            </li>
          </ul>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">6. Propriété intellectuelle</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Les contenus présents sur le site (textes, logos, éléments
            graphiques, design, etc.) sont protégés par les lois relatives à la
            propriété intellectuelle. Toute reproduction ou réutilisation sans
            autorisation préalable de Nomad Braid est interdite.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            7. Mesure d’audience et suivi analytique
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Pour assurer le bon fonctionnement du site, en améliorer la qualité
            et mesurer l’intérêt porté au projet Nomad Braid, des outils de
            mesure d’audience et de performance, notamment{" "}
            <strong>Vercel Analytics</strong>, sont utilisés.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ces mesures impliquent la collecte de données techniques de
            navigation (par exemple, pages consultées, caractéristiques du
            navigateur, langue, certains identifiants techniques). Elles sont
            mises en œuvre de manière proportionnée et dans le respect des
            principes de protection des données, tels que décrits dans la{" "}
            <a
              href="/politique-de-confidentialite"
              className="underline underline-offset-4 hover:text-primary"
            >
              Politique de confidentialité
            </a>
            .
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Compte tenu de la finalité strictement liée à la sécurité, au
            fonctionnement et à l’amélioration continue du site, ce suivi
            analytique est{" "}
            <strong>considéré comme nécessaire et obligatoire</strong> pour
            l’utilisation du site. En naviguant sur le site, vous acceptez
            l’utilisation de ces outils de mesure d’audience.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            8. Responsabilité et disponibilité du site
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nomad Braid s’efforce de maintenir le site accessible et
            fonctionnel. Toutefois, l’accès peut être interrompu, notamment pour
            des raisons de maintenance, de mise à jour ou en cas de problème
            technique indépendant de notre volonté.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nomad Braid ne pourra être tenue responsable des dommages directs ou
            indirects liés à l’utilisation ou à l’impossibilité d’utiliser le
            site, y compris en cas de perte de données ou de préjudice
            financier, dans les limites autorisées par la loi.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            9. Données personnelles
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Les modalités de traitement de vos données personnelles, ainsi que
            vos droits, sont détaillés dans la{" "}
            <a
              href="/politique-de-confidentialite"
              className="underline underline-offset-4 hover:text-primary"
            >
              Politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            10. Modification des CGU
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nomad Braid se réserve le droit de modifier les présentes CGU à tout
            moment, notamment pour tenir compte de l’évolution du site ou de la
            réglementation applicable. La version en vigueur est celle publiée
            sur le site à la date de votre navigation.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            11. Droit applicable et juridiction compétente
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Les présentes CGU sont soumises au droit français. Tout litige
            relatif à leur interprétation ou à leur exécution, à défaut de
            résolution amiable, sera soumis aux tribunaux français compétents.
          </p>
        </section>

        <hr className="my-10 border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Terms of Use (English version)
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This English version is provided for convenience. In case of
            discrepancy, the French version above will prevail.
          </p>

          <h3 className="mt-4 text-lg font-semibold">1. Purpose of the site</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The Nomad Braid website presents the Nomad Braid project and allows
            interested people to join a <strong>waitlist</strong> in order to be
            informed about the launch of the service and benefit from priority
            access. The site is not, at this stage, a full booking platform or a
            binding service contract.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            2. Acceptance of the Terms of Use
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Access to and use of the site imply full acceptance of these Terms
            of Use, together with the{" "}
            <a
              href="/mentions-legales"
              className="underline underline-offset-4 hover:text-primary"
            >
              Legal Notice
            </a>{" "}
            and the{" "}
            <a
              href="/politique-de-confidentialite"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            3. Joining the waitlist
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Joining the waitlist is reserved for adults or individuals with the
            consent of their legal representative. By completing the form, you
            agree to provide accurate, complete and up-to-date information.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Joining the waitlist does not constitute a firm reservation or a
            guarantee that a service will be available on a specific date. It
            allows us to contact you when the Nomad Braid service is launched
            and to better understand your needs.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            4. Communications and notifications
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            By joining the waitlist, you agree that Nomad Braid may contact you
            by email and/or WhatsApp (if your number can receive messages on
            this channel) to provide information about Nomad Braid, the launch
            of the service and related offers.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            You can request to stop receiving such communications at any time by
            writing to{" "}
            <a
              href="mailto:info@nomadbraid.fr"
              className="underline underline-offset-4 hover:text-primary"
            >
              info@nomadbraid.fr
            </a>
            .
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            5. User behaviour
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Users agree to use the site in compliance with applicable laws and
            these Terms of Use. In particular, users shall not:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>provide false information or impersonate another person ;</li>
            <li>
              infringe the rights of Nomad Braid or any third party (copyright,
              trademarks, privacy, etc.) ;
            </li>
            <li>
              attempt to disrupt the proper functioning or security of the site
              (intrusions, attacks, etc.).
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-semibold">
            6. Intellectual property
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Content on the site (texts, logos, visual elements, design, etc.) is
            protected by intellectual property laws. Any reproduction or reuse
            without prior authorization from Nomad Braid is prohibited.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            7. Analytics and tracking
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            To ensure the proper operation of the site, improve its quality and
            measure interest in the Nomad Braid project, the site uses audience
            and performance measurement tools, including{" "}
            <strong>Vercel Analytics</strong>.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This involves the collection of technical navigation data (for
            example, pages viewed, browser characteristics, language and some
            technical identifiers) implemented in a way that is proportionate
            and respectful of privacy, as described in the{" "}
            <a
              href="/politique-de-confidentialite"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Given the strictly necessary purpose relating to security,
            operation and continuous improvement of the site, such analytics
            tracking is{" "}
            <strong>considered necessary and mandatory</strong> for using the
            site. By browsing the site, you agree to the use of these audience
            measurement tools.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            8. Liability and availability
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nomad Braid strives to keep the site available and functional.
            However, access may be interrupted, in particular for maintenance,
            updates or in case of technical issues beyond our control.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nomad Braid cannot be held liable for direct or indirect damage
            arising from use of, or inability to use, the site (including loss
            of data or financial loss), to the extent permitted by law.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            9. Personal data
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The way we process your personal data and your rights in this
            respect are described in detail in the{" "}
            <a
              href="/politique-de-confidentialite"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            10. Changes to the Terms of Use
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nomad Braid may amend these Terms of Use from time to time, in
            particular to reflect changes to the site or applicable law. The
            version in force is the one published on the site at the time of
            your visit.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            11. Governing law and jurisdiction
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            These Terms of Use are governed by French law. Any dispute relating
            to their interpretation or performance, failing an amicable
            resolution, shall be submitted to the competent French courts.
          </p>
        </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
