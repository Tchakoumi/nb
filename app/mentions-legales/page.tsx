import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";

export const metadata = {
  title: "Mentions légales – Nomad Braid",
};

export default function MentionsLegalesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-6 py-10 md:py-14 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Mentions légales
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Version française – une version anglaise est disponible plus bas sur
          la page.
        </p>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">1. Éditeur du site</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Le site Nomad Braid est édité par <strong>Nomad Braid</strong>.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Contact&nbsp;:{" "}
            <a
              href="mailto:info@nomadbraid.fr"
              className="underline underline-offset-4 hover:text-primary"
            >
              info@nomadbraid.fr
            </a>
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Code postal&nbsp;: 95800 – France.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">2. Hébergement</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Le site est hébergé par Vercel via des infrastructures
            d&apos;hébergement cloud situées dans l&apos;Union européenne. Les
            données sont traitées dans l&apos;Union européenne, dans le respect
            du droit européen applicable en matière de protection des données.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            3. Propriété intellectuelle
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            L&apos;ensemble des éléments composant le site Nomad Braid (textes,
            visuels, logo, mises en page, design, etc.) est protégé par les
            législations françaises et internationales relatives à la propriété
            intellectuelle.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Toute reproduction, représentation, modification, adaptation,
            diffusion ou exploitation, partielle ou totale, du site ou de l&apos;un
            quelconque des éléments qui le composent, par quelque procédé que ce
            soit, sans l&apos;autorisation écrite préalable de Nomad Braid, est
            strictement interdite et est susceptible de constituer un délit de
            contrefaçon.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">4. Responsabilité</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nomad Braid s&apos;efforce de fournir des informations à jour et
            exactes sur le site. Toutefois, aucune garantie n&apos;est donnée
            quant à l&apos;exhaustivité, l&apos;actualité ou l&apos;exactitude
            des contenus.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nomad Braid ne pourra être tenue responsable des dommages directs ou
            indirects résultant de l&apos;accès au site, de son utilisation ou
            de son impossibilité d&apos;accès, y compris en cas d&apos;interruption
            du service, de bug, d&apos;erreur ou d&apos;inexactitude.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Le site peut contenir des liens hypertextes vers d&apos;autres sites
            ou services tiers. Nomad Braid n&apos;exerce aucun contrôle sur ces
            ressources et ne saurait être tenue responsable de leur contenu ou
            de leur sécurité.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            5. Données personnelles et cookies
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Le traitement des données personnelles collectées via le formulaire
            de liste d&apos;attente et via la mesure d&apos;audience du site est
            décrit en détail dans la{" "}
            <a
              href="/politique-de-confidentialite"
              className="underline underline-offset-4 hover:text-primary"
            >
              Politique de confidentialité
            </a>
            .
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Des outils de mesure d&apos;audience et de performance, notamment{" "}
            <strong>Vercel Analytics</strong>, sont utilisés pour assurer le bon
            fonctionnement du site, suivre ses performances et améliorer le
            service. Ces mesures sont considérées comme nécessaires au
            fonctionnement et à l&apos;amélioration continue du site et ne sont
            pas optionnelles.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            6. Droit applicable et juridiction compétente
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Les présentes mentions légales sont soumises au droit français. En
            cas de litige relatif à l&apos;utilisation du site, et à défaut
            d&apos;accord amiable, les tribunaux français compétents seront
            seuls compétents.
          </p>
        </section>

        <hr className="my-10 border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Legal notice (English)</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This English version is provided for convenience. In case of
            discrepancy, the French version above will prevail.
          </p>

          <h3 className="mt-4 text-lg font-semibold">1. Site publisher</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The Nomad Braid website is published by <strong>Nomad Braid</strong>.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Contact:{" "}
            <a
              href="mailto:info@nomadbraid.fr"
              className="underline underline-offset-4 hover:text-primary"
            >
              info@nomadbraid.fr
            </a>
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Postal code: 95800 – France.
          </p>

          <h3 className="mt-4 text-lg font-semibold">2. Hosting</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The site is hosted by Vercel using cloud infrastructure located in
            the European Union. Data is processed within the EU in compliance
            with applicable European data protection law.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            3. Intellectual property
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            All content on the Nomad Braid website (texts, visuals, logo,
            layout, design, etc.) is protected by applicable intellectual
            property laws. Any reproduction, representation, modification,
            adaptation or distribution of all or part of the site without prior
            written authorization from Nomad Braid is strictly prohibited.
          </p>

          <h3 className="mt-4 text-lg font-semibold">4. Liability</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nomad Braid makes reasonable efforts to provide accurate and updated
            information on the site but does not guarantee its completeness or
            accuracy. Nomad Braid cannot be held liable for any direct or
            indirect damage resulting from use of, or inability to use, the
            site.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The site may contain links to third-party websites or services.{" "}
            Nomad Braid has no control over these external resources and cannot
            be held responsible for their content or security.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            5. Personal data and cookies
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The processing of personal data collected through the waitlist form
            and through audience measurement tools is described in detail in the{" "}
            <a
              href="/politique-de-confidentialite"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Audience and performance measurement tools, including{" "}
            <strong>Vercel Analytics</strong>, are used to ensure the proper
            operation of the site, monitor its performance and improve the
            service. These measurements are considered necessary for operating
            and improving the site and are not optional.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            6. Governing law and jurisdiction
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            These legal notices are governed by French law. In case of dispute
            relating to the use of the site, and failing an amicable resolution,
            the competent French courts shall have exclusive jurisdiction.
          </p>
        </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
