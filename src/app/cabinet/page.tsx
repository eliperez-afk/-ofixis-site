import Link from "next/link";
import type { Metadata } from "next";
import { CABINET, EQUIPE, EST_PRODUCTION } from "@/config/cabinet";
import { Conteneur, Section, Surtitre } from "@/components/conteneur";
import { FilAriane } from "@/components/fil-ariane";
import { BlocCta } from "@/components/bloc-cta";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  titre: "Le cabinet",
  description:
    "OFIXIS, cabinet d'expertise comptable et de commissariat aux comptes à Levallois-Perret : notre façon de travailler, nos engagements et le cadre déontologique de nos missions.",
  chemin: "/cabinet",
});

/**
 * Page « Le cabinet ».
 *
 * Le récit d'entreprise (année de création, étapes, valeurs propres au cabinet)
 * n'est pas rédigé : il relève de faits que seul le cabinet peut fournir
 * (question J1 du cadrage). Cette page s'en tient donc à ce qui est vérifiable :
 * la façon de travailler et le cadre déontologique, qui s'impose à tout
 * professionnel inscrit.
 */
export default function PageCabinet() {
  const adresse = CABINET.adresse.valeur;

  return (
    <>
      <Conteneur taille="large">
        <div className="py-8">
          <FilAriane elements={[{ libelle: "Le cabinet", href: "/cabinet" }]} />
        </div>

        <div className="max-w-2xl pb-14">
          <h1 className="font-titre text-4xl sm:text-5xl">Le cabinet</h1>
          <p className="mt-5 text-lg leading-relaxed text-ardoise-700">
            {CABINET.nom} est un cabinet d&apos;expertise comptable et de
            commissariat aux comptes installé à {adresse.ville}. Nous
            accompagnons des TPE, des PME, des professions libérales et des
            associations d&apos;Île-de-France sur leurs obligations comptables,
            fiscales et sociales, et sur les décisions qui en découlent.
          </p>
        </div>
      </Conteneur>

      {!EST_PRODUCTION && (
        <Conteneur taille="large">
          <p className="mb-10 rounded-carte border border-laiton-clair bg-laiton-pale px-4 py-3 text-sm text-ardoise-900">
            <strong>À compléter par le cabinet.</strong> L&apos;histoire du
            cabinet, son année de création et ses étapes marquantes ne sont pas
            rédigées : ces éléments relèvent de faits que seul le cabinet peut
            fournir (question J1 du cadrage).
          </p>
        </Conteneur>
      )}

      {/* ── Façon de travailler ───────────────────────────────────────── */}
      <Section className="border-y border-bordure bg-white">
        <Conteneur taille="large">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div>
              <Surtitre>Notre approche</Surtitre>
              <h2 className="font-titre text-3xl">
                Une relation suivie, pas un rendez-vous annuel
              </h2>
              <p className="mt-5 text-ardoise-700">
                Beaucoup de dirigeants ne voient leur expert-comptable
                qu&apos;une fois par an, à la signature du bilan. À ce
                moment-là, l&apos;exercice est clos : on constate, on ne corrige
                plus.
              </p>
              <p className="mt-4 text-ardoise-700">
                Nous privilégions un suivi régulier, calibré selon la taille et
                les besoins de chaque structure, pour que les sujets se traitent
                quand il est encore temps d&apos;agir.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {[
                {
                  titre: "Un interlocuteur identifié",
                  texte:
                    "Vous savez qui suit votre dossier et à qui vous adresser. Vos questions ne repartent pas de zéro à chaque échange.",
                },
                {
                  titre: "Un périmètre écrit",
                  texte:
                    "Ce que comprend la mission, ce qu'elle ne comprend pas, ce qui reste à votre charge et les honoraires correspondants : tout figure dans la lettre de mission.",
                },
                {
                  titre: "Un langage compréhensible",
                  texte:
                    "Nous expliquons ce que disent vos comptes et les conséquences concrètes des options qui s'offrent à vous, sans jargon inutile.",
                },
                {
                  titre: "Des limites assumées",
                  texte:
                    "Lorsqu'un sujet relève d'un avocat, d'un notaire ou d'un autre professionnel, nous le disons et nous vous orientons plutôt que de sortir de notre domaine.",
                },
              ].map((bloc) => (
                <div key={bloc.titre}>
                  <h3 className="font-titre text-lg">{bloc.titre}</h3>
                  <p className="mt-2 text-ardoise-700">{bloc.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </Conteneur>
      </Section>

      {/* ── Cadre déontologique ───────────────────────────────────────── */}
      <Section>
        <Conteneur taille="etroite">
          <Surtitre>Le cadre de nos missions</Surtitre>
          <h2 className="font-titre text-3xl">
            Une profession réglementée, et ce que cela implique pour vous
          </h2>
          <p className="mt-5 text-ardoise-700">
            L&apos;expertise comptable et le commissariat aux comptes sont des
            professions réglementées. Les obligations qui s&apos;imposent à nous
            constituent autant de garanties pour vous.
          </p>

          <dl className="mt-10 divide-y divide-bordure border-y border-bordure">
            {[
              {
                titre: "Secret professionnel",
                texte:
                  "Nous sommes tenus au secret professionnel sur tout ce dont nous avons connaissance dans le cadre de nos missions. C'est aussi la raison pour laquelle nous ne publions aucun nom ni logo de client sur ce site.",
              },
              {
                titre: "Indépendance",
                texte:
                  "Notre jugement ne doit dépendre d'aucun intérêt extérieur. Cette exigence est particulièrement stricte en commissariat aux comptes : nous ne pouvons pas certifier des comptes que nous aurions nous-mêmes établis.",
              },
              {
                titre: "Compétence et formation continue",
                texte:
                  "La profession impose une obligation de formation continue : les règles comptables, fiscales et sociales évoluent chaque année.",
              },
              {
                titre: "Assurance responsabilité civile professionnelle",
                texte:
                  "Tout professionnel inscrit est couvert par une assurance obligatoire au titre de sa responsabilité civile professionnelle.",
              },
              {
                titre: "Lettre de mission",
                texte:
                  "Aucune mission ne démarre sans un document écrit définissant son périmètre, les obligations de chacun et les honoraires.",
              },
            ].map((bloc) => (
              <div key={bloc.titre} className="py-6">
                <dt className="font-titre text-lg text-encre">{bloc.titre}</dt>
                <dd className="mt-2 text-ardoise-700">{bloc.texte}</dd>
              </div>
            ))}
          </dl>
        </Conteneur>
      </Section>

      {/* ── Implantation ──────────────────────────────────────────────── */}
      <Section className="border-t border-bordure bg-white">
        <Conteneur taille="large">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Surtitre>Où nous trouver</Surtitre>
              <h2 className="font-titre text-3xl">{adresse.ville}</h2>
              <p className="mt-5 text-ardoise-700">
                Le cabinet est installé au {adresse.rue}, à {adresse.ville}. Nous
                intervenons auprès de clients situés à Levallois-Perret, à Paris
                et plus largement en {adresse.regionAffichee}.
              </p>
              <p className="mt-4 text-ardoise-700">
                Les rendez-vous peuvent se tenir au cabinet, par téléphone ou en
                visioconférence, selon ce qui vous convient le mieux.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-douce border border-encre px-5 py-3 font-medium text-encre transition-colors hover:bg-craie-ombre"
                >
                  Nous écrire
                </Link>
                <Link
                  href="/prendre-rendez-vous"
                  className="rounded-douce bg-encre px-5 py-3 font-medium text-white transition-colors hover:bg-ardoise-900"
                >
                  Prendre rendez-vous
                </Link>
              </div>
            </div>

            <div className="rounded-carte border border-bordure bg-craie p-6">
              <h3 className="font-titre text-lg">Adresse</h3>
              <address className="mt-3 not-italic text-ardoise-700">
                {CABINET.nom}
                <br />
                {adresse.rue}
                <br />
                {adresse.codePostal} {adresse.ville}
              </address>

              {/*
                Horaires, accès et stationnement seront ajoutés dès que le
                cabinet les aura communiqués (question D3 du cadrage).
                Rien n'est supposé ici : une information d'accès erronée fait
                perdre un rendez-vous.
              */}
              <p className="mt-5 text-sm text-ardoise-500">
                Horaires et informations d&apos;accès communiqués lors de la
                prise de rendez-vous.
              </p>
            </div>
          </div>
        </Conteneur>
      </Section>

      {/* L'équipe n'est présentée que lorsque chaque personne a consenti
          par écrit à la publication de son nom, de sa fonction et de son
          portrait. */}
      {EQUIPE.length > 0 && (
        <Section>
          <Conteneur taille="large">
            <h2 className="font-titre text-3xl">L&apos;équipe</h2>
            <Link
              href="/equipe"
              className="mt-4 inline-block text-laiton underline underline-offset-2"
            >
              Découvrir l&apos;équipe
            </Link>
          </Conteneur>
        </Section>
      )}

      <BlocCta />
    </>
  );
}
