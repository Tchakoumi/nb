import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";

export const metadata = {
  title: "Politique de confidentialité – Nomad Braid",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-6 py-10 md:py-14 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Version française – une version anglaise est disponible plus bas sur
          la page.
        </p>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">
            1. Responsable du traitement et contact
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Le traitement des données personnelles collectées via le site Nomad
            Braid est réalisé par <strong>Nomad Braid</strong>.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Pour toute question ou demande relative à vos données personnelles,
            vous pouvez nous contacter à l&apos;adresse suivante&nbsp;:{" "}
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
            2. Données collectées et origine
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Les données suivantes peuvent être collectées lorsque vous
            remplissez le formulaire de liste d&apos;attente ou naviguez sur le
            site&nbsp;:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>
              Données d&apos;identité et de contact&nbsp;: prénom, nom, genre,
              adresse e-mail, numéro de téléphone, indicateur de disponibilité
              sur WhatsApp.
            </li>
            <li>
              Données de localisation approximative&nbsp;: description de la
              ville, identifiant de lieu et code pays associé.
            </li>
            <li>
              Données de préférences et d&apos;usage liées à la coiffure&nbsp;:
              fréquence de coiffure, budget moyen, statut (par exemple salariée,
              étudiante, etc.), activité éventuelle de coiffure pour d&apos;autres
              personnes, qui réalise les coiffures.
            </li>
            <li>
              Données techniques de navigation et de performance&nbsp;: pages
              visitées, événements de navigation, type d&apos;appareil et de
              navigateur, langue du navigateur, et autres mesures
              d&apos;audience collectées via des outils de mesure tels que{" "}
              <strong>Vercel Analytics</strong>.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ces données sont principalement fournies par vous via le formulaire
            de liste d&apos;attente ou collectées automatiquement lors de votre
            navigation sur le site.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            3. Finalités et bases juridiques du traitement
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Vos données sont traitées pour les finalités suivantes&nbsp;:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>
              <strong>Gestion de la liste d&apos;attente</strong>&nbsp;: prise en
              compte de votre inscription, organisation de l&apos;ordre de
              priorité et gestion du lancement du service.
            </li>
            <li>
              <strong>Communication avec vous</strong>&nbsp;: envoi de messages
              d&apos;accueil ou d&apos;information par e-mail ou WhatsApp concernant
              Nomad Braid et le lancement du service.
            </li>
            <li>
              <strong>Analyse de la demande et amélioration du service</strong>
              &nbsp;: analyse statistique des réponses au formulaire (fréquence,
              budget, localisation, etc.) afin de comprendre les besoins des
              personnes intéressées et d&apos;adapter l&apos;offre.
            </li>
            <li>
              <strong>Mesure d&apos;audience et performance du site</strong>
              &nbsp;: suivi des visites et performances du site afin d&apos;en
              assurer le bon fonctionnement, la sécurité et l&apos;amélioration
              continue (notamment via Vercel Analytics).
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Selon les cas, ces traitements reposent sur&nbsp;:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>
              <strong>Votre consentement</strong> lorsque vous choisissez de
              vous inscrire à la liste d&apos;attente et de nous transmettre vos
              informations.
            </li>
            <li>
              <strong>Notre intérêt légitime</strong> à développer et améliorer
              le service Nomad Braid, à sécuriser le site et à mesurer son
              audience.
            </li>
          </ul>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            4. Destinataires et sous-traitants
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Vos données sont traitées principalement par Nomad Braid et
            peuvent, le cas échéant, être transmises à des prestataires
            techniques intervenant pour notre compte, notamment pour&nbsp;:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>l&apos;hébergement et l&apos;exploitation du site (Vercel) ;</li>
            <li>
              l&apos;envoi d&apos;emails transactionnels (par exemple, un
              prestataire d&apos;emailing) ;
            </li>
            <li>
              l&apos;envoi de messages via WhatsApp pour les personnes
              concernées.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ces prestataires agissent en qualité de sous-traitants au sens de la
            réglementation applicable et sont tenus à des obligations strictes de
            confidentialité et de sécurité.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            5. Transferts de données hors de l&apos;Union européenne
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Les infrastructures principales d&apos;hébergement utilisées pour le
            site (Vercel et la base de données) sont situées dans l&apos;Union
            européenne. Certains prestataires techniques tiers (par exemple
            certains outils d&apos;emailing ou de messagerie) peuvent toutefois
            traiter des données depuis des pays situés en dehors de l&apos;Union
            européenne.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Dans ce cas, des garanties appropriées sont mises en place (telles
            que des clauses contractuelles types approuvées par la Commission
            européenne ou des mécanismes équivalents) afin d&apos;assurer un
            niveau de protection des données personnelles conforme à la
            réglementation européenne.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            6. Durée de conservation des données
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Les données collectées via la liste d&apos;attente sont conservées
            pendant la durée nécessaire à la préparation et au lancement du
            service Nomad Braid, puis pendant une durée limitée après ce
            lancement, dans la limite de ce qui est nécessaire pour assurer le
            suivi du projet et de la relation avec les personnes inscrites.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Les données techniques d&apos;audience et de performance collectées
            via des outils comme Vercel Analytics sont conservées pour des
            durées raisonnables, proportionnées aux finalités de mesure
            d&apos;audience, d&apos;analyse et d&apos;amélioration du site.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            7. Droits des personnes concernées
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Conformément à la réglementation applicable en matière de protection
            des données personnelles (notamment le Règlement (UE) 2016/679
            dit&nbsp;«&nbsp;RGPD&nbsp;»), vous disposez des droits suivants&nbsp;:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>droit d&apos;accès à vos données ;</li>
            <li>droit de rectification des données inexactes ou incomplètes ;</li>
            <li>droit d&apos;effacement dans certains cas ;</li>
            <li>
              droit à la limitation du traitement dans les cas prévus par la
              loi ;
            </li>
            <li>
              droit d&apos;opposition au traitement de vos données pour des
              motifs tenant à votre situation particulière, lorsque le
              traitement est fondé sur l&apos;intérêt légitime ;
            </li>
            <li>
              droit à la portabilité des données que vous avez fournies, lorsque
              le traitement est fondé sur votre consentement ou sur l&apos;exécution
              de mesures précontractuelles ou contractuelles et réalisé à l&apos;aide
              de procédés automatisés.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Pour exercer ces droits, il vous suffit d&apos;adresser un e-mail à&nbsp;:{" "}
            <a
              href="mailto:info@nomadbraid.fr"
              className="underline underline-offset-4 hover:text-primary"
            >
              info@nomadbraid.fr
            </a>
            .
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Vous disposez également du droit d&apos;introduire une réclamation
            auprès de l&apos;autorité de contrôle compétente en matière de
            protection des données (en France, la CNIL&nbsp;–{" "}
            <a
              href="https://www.cnil.fr"
              className="underline underline-offset-4 hover:text-primary"
              target="_blank"
              rel="noreferrer"
            >
              www.cnil.fr
            </a>
            ).
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            8. Cookies, mesure d&apos;audience et Vercel Analytics
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Le site Nomad Braid utilise des outils de mesure d&apos;audience et
            de performance, y compris <strong>Vercel Analytics</strong>, afin de
            comprendre comment le site est utilisé, d&apos;en assurer le bon
            fonctionnement et d&apos;améliorer l&apos;expérience utilisateur.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Dans la mesure du possible, ces mesures sont mises en œuvre de
            manière respectueuse de la vie privée, en limitant la collecte
            d&apos;identifiants directement identifiants et en utilisant des
            données agrégées ou pseudonymisées.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Compte tenu de l&apos;état actuel du service et de la finalité
            strictement liée à la qualité, la sécurité et l&apos;amélioration du
            site, ces mesures d&apos;audience sont considérées comme{" "}
            <strong>nécessaires au fonctionnement du site</strong> et ne font
            pas l&apos;objet d&apos;une option de désactivation par bandeau de
            cookies à ce stade.
          </p>
        </section>

        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">
            9. Mise à jour de la présente politique
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            La présente politique de confidentialité est susceptible d&apos;être
            mise à jour pour refléter l&apos;évolution du service Nomad Braid,
            de nos pratiques ou de la réglementation applicable. Nous vous
            invitons à la consulter régulièrement.
          </p>
        </section>

        <hr className="my-10 border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Privacy Policy (English)</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This English version is provided for convenience. In case of
            discrepancy, the French version above will prevail.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            1. Data controller and contact
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Personal data collected through the Nomad Braid website is processed
            by <strong>Nomad Braid</strong>.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            For any question or request regarding your personal data, you can
            contact us at:{" "}
            <a
              href="mailto:info@nomadbraid.fr"
              className="underline underline-offset-4 hover:text-primary"
            >
              info@nomadbraid.fr
            </a>
            .
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            2. Data collected and sources
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The following categories of data may be collected when you join the
            waitlist or browse the site:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>
              Identity and contact data: first name, last name, gender, email
              address, phone number, WhatsApp availability indicator.
            </li>
            <li>
              Approximate location data: town description, place identifier and
              associated country code.
            </li>
            <li>
              Preference and usage data related to hair styling: styling
              frequency, average budget, status (e.g. employed, student, etc.),
              whether you braid or style other people&apos;s hair, who usually
              does your hair.
            </li>
            <li>
              Technical and analytics data: pages visited, navigation events,
              device and browser type, browser language and other audience
              metrics collected via tools such as <strong>Vercel Analytics</strong>.
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-semibold">
            3. Purposes and legal bases
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your data is processed for the following purposes:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>
              Managing the waitlist for the Nomad Braid service and organizing
              priority access.
            </li>
            <li>
              Communicating with you by email or WhatsApp about Nomad Braid and
              the launch of the service.
            </li>
            <li>
              Analysing demand and improving the service based on aggregated
              statistics.
            </li>
            <li>
              Measuring audience and performance of the site, ensuring its
              security and continuous improvement (including via Vercel
              Analytics).
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Depending on the situation, these processing activities rely on:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>
              Your consent when you choose to join the waitlist and provide your
              information.
            </li>
            <li>
              Our legitimate interest in developing and improving the Nomad
              Braid service, securing the site and measuring its audience.
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-semibold">
            4. Recipients and processors
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your data is mainly processed by Nomad Braid and may be shared with
            technical service providers acting as processors, for example:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>hosting and running the site (Vercel) ;</li>
            <li>sending transactional emails through an email provider ;</li>
            <li>
              sending messages via WhatsApp for subscribers who can be reached
              on this channel.
            </li>
          </ul>

          <h3 className="mt-4 text-lg font-semibold">
            5. International data transfers
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The main hosting infrastructure used for the site (Vercel and the
            database) is located in the European Union. Some third-party
            technical providers (for example, certain email or messaging tools)
            may, however, process data from countries outside the European
            Union.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            In such cases, appropriate safeguards are implemented (such as
            standard contractual clauses approved by the European Commission or
            equivalent mechanisms) to ensure a level of protection consistent
            with EU data protection rules.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            6. Data retention periods
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Data collected via the waitlist is kept for the time necessary to
            prepare and launch the Nomad Braid service and for a limited period
            thereafter, to manage the relationship with interested people.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Technical and analytics data (including Vercel Analytics data) is
            retained for reasonable periods, proportionate to the purposes of
            audience measurement, analysis and site improvement.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            7. Your rights regarding personal data
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Under applicable data protection law (including the EU General Data
            Protection Regulation), you have in particular the right to:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground space-y-1">
            <li>access your personal data ;</li>
            <li>request correction of inaccurate or incomplete data ;</li>
            <li>
              request erasure of your data in certain circumstances ;
            </li>
            <li>
              request restriction of processing in the cases provided by law ;
            </li>
            <li>
              object, on grounds relating to your particular situation, to
              processing based on legitimate interest ;
            </li>
            <li>
              request portability of data you have provided when processing is
              based on consent or pre-contractual/contractual measures and is
              carried out by automated means.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            To exercise these rights, you can send an email to:{" "}
            <a
              href="mailto:info@nomadbraid.fr"
              className="underline underline-offset-4 hover:text-primary"
            >
              info@nomadbraid.fr
            </a>
            .
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            You also have the right to lodge a complaint with a competent data
            protection authority (for example, in France, the CNIL).
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            8. Cookies, analytics and Vercel Analytics
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The Nomad Braid website uses audience measurement and performance
            tools, including <strong>Vercel Analytics</strong>, to understand
            how the site is used, ensure its proper operation and improve the
            user experience.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Where possible, these tools are configured to limit the collection
            of directly identifying information and to rely on aggregated or
            pseudonymised data.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Given the current state of the service and the strictly necessary
            purpose of quality, security and improvement of the site, audience
            measurement is considered{" "}
            <strong>necessary for operating the site</strong> and is therefore
            not offered as an optional cookie that you can deactivate via a
            banner at this stage.
          </p>

          <h3 className="mt-4 text-lg font-semibold">
            9. Updates to this policy
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This privacy policy may be updated from time to time to reflect
            changes in the Nomad Braid service, our practices or applicable
            regulations. We encourage you to review it regularly.
          </p>
        </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
