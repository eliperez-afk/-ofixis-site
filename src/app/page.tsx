import Link from "next/link";
import type { Metadata } from "next";
import { CABINET, CHIFFRES_CLES } from "@/config/cabinet";
import { lienEspaceClient } from "@/config/navigation";
import { MISSIONS } from "@/content/missions";
import { articlesPublies, formaterDate } from "@/lib/actualites";
import { Conteneur, Section, Surtitre } from "@/components/conteneur";
import { BlocCta } from "@/components/bloc-cta";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  titre: "Expert-comptable et commissaire aux comptes à Levallois-Perret",
  description:
    "Cabinet d'expertise comptable et de commissariat aux comptes à Levallois-Perret. Comptabilité, fiscalité, paie et audit pour les TPE, PME et professions libérales d'Île-de-France.",
  chemin: "/",
});

export default function Accueil() {
  const telephone = CABINET.telephone.valeur;
  const adresse = CABINET.adresse.valeur;
  const espaceClient = lienEspaceClient();
  const articles = articlesPublies().slice(0, 3);

  return (
    <>
      {/* ── Premier écran ───────────────────────────────────────────────
          Doit répondre en un coup d'œil : qui, pour qui, où, quelle valeur,
          comment nous joindre. */}
      <section className="border-b border-bordure bg-white">
        <Conteneur taille="large">
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-sm font-medium text-laiton">
                {adresse.ville} · {adresse.regionAffichee}
              </p>

              <h1 className="mt-4 font-titre text-[2.1rem] leading-[1.15] sm:text-5xl sm:leading-[1.1]">
                Expert-comptable et commissaire aux comptes
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ardoise-700">
                {CABINET.nom} accompagne les TPE, PME, professions libérales et
                associations d&apos;Île-de-France : tenue et révision des comptes,
                fiscalité, paie, audit légal et contractuel. Un interlocuteur
                qui connaît votre dossier et vous explique ce que disent vos
                chiffres.
              </p>

              {/* Trois actions, visibles sans défilement. */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/prendre-rendez-vous"
                  className="rounded-douce bg-encre px-6 py-3.5 text-center font-medium text-white transition-colors hover:bg-ardoise-900"
                >
                  Prendre rendez-vous
                </Link>
                <a
                  href={`tel:${telephone.lien}`}
                  className="rounded-douce border border-encre px-6 py-3.5 text-center font-medium text-encre transition-colors hover:bg-craie-ombre"
                >
                  Appeler le {telephone.affichage}
                </a>
                {espaceClient && (
                  <a
                    href={espaceClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-douce border border-bordure px-6 py-3.5 text-center font-medium text-ardoise-700 transition-colors hover:border-laiton hover:text-laiton"
                  >
                    Espace client
                    <span className="sr-only"> (nouvelle fenêtre)</span>
                  </a>
                )}
              </div>

              <p className="mt-5 text-sm text-ardoise-500">
                Premier échange sans engagement, en cabinet, par téléphone ou en
                visioconférence.
              </p>
            </div>

            {/* Carte d'informations pratiques */}
            <aside className="rounded-carte border border-bordure bg-craie p-6 sm:p-7">
              <h2 className="font-titre text-lg">Le cabinet en pratique</h2>

              <dl className="mt-5 space-y-4 text-[0.95rem]">
                <div>
                  <dt className="text-sm text-ardoise-500">Adresse</dt>
                  <dd className="mt-1 text-ardoise-900">
                    {adresse.rue}
                    <br />
                    {adresse.codePostal} {adresse.ville}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-ardoise-500">Téléphone</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${telephone.lien}`}
                      className="text-laiton underline underline-offset-2 hover:text-encre"
                    >
                      {telephone.affichage}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-ardoise-500">E-mail</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${CABINET.email.valeur}`}
                      className="break-all text-laiton underline underline-offset-2 hover:text-encre"
                    >
                      {CABINET.email.valeur}
                    </a>
                  </dd>
                </div>
                {CABINET.horaires.statut === "confirme" && CABINET.horaires.valeur && (
                  <div>
                    <dt className="text-sm text-ardoise-500">Horaires</dt>
                    <dd className="mt-1 text-ardoise-900">
                      {CABINET.horaires.valeur.libelleJours}
                      <br />
                      {CABINET.horaires.valeur.libelleHeures}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm text-ardoise-500">Interventions</dt>
                  <dd className="mt-1 text-ardoise-900">
                    Levallois-Perret, Paris et Île-de-France
                  </dd>
                </div>
              </dl>

              {/*
                Les chiffres clés ne sont affichés que lorsqu'ils ont été
                validés, datés et périmétrés par le cabinet.
              */}
              {CHIFFRES_CLES.length > 0 && (
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-bordure pt-6">
                  {CHIFFRES_CLES.map((chiffre) => (
                    <div key={chiffre.libelle}>
                      <dt className="font-titre text-2xl text-encre">
                        {chiffre.valeur}
                      </dt>
                      <dd className="text-sm text-ardoise-500">
                        {chiffre.libelle}
                        <span className="block text-xs">{chiffre.precision}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </aside>
          </div>
        </Conteneur>
      </section>

      {/* ── Missions ─────────────────────────────────────────────────── */}
      <Section>
        <Conteneur taille="large">
          <Surtitre>Nos missions</Surtitre>
          <h2 className="font-titre text-3xl sm:text-4xl">
            Ce que nous prenons en charge
          </h2>
          <p className="mt-4 max-w-2xl text-ardoise-700">
            Le périmètre de chaque mission est défini avec vous et formalisé dans
            une lettre de mission avant tout démarrage.
          </p>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-carte border border-bordure bg-bordure sm:grid-cols-2 lg:grid-cols-4">
            {MISSIONS.map((mission) => (
              <li key={mission.slug} className="bg-white">
                <Link
                  href={`/missions/${mission.slug}`}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-craie"
                >
                  <h3 className="font-titre text-lg text-encre group-hover:text-laiton">
                    {mission.titreCourt}
                  </h3>
                  <p className="mt-2 grow text-sm leading-relaxed text-ardoise-500">
                    {mission.chapo}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-4 text-sm font-medium text-laiton"
                  >
                    En savoir plus →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Conteneur>
      </Section>

      {/* ── Méthode ──────────────────────────────────────────────────── */}
      <Section className="border-y border-bordure bg-white">
        <Conteneur taille="large">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <Surtitre>Notre façon de travailler</Surtitre>
              <h2 className="font-titre text-3xl sm:text-4xl">
                Des comptes qui servent à décider
              </h2>
              <p className="mt-5 text-ardoise-700">
                Une comptabilité produite une fois par an, plusieurs mois après
                la clôture, ne sert qu&apos;à remplir une obligation. Nous
                travaillons pour qu&apos;elle vous serve aussi à décider :
                anticiper une échéance, mesurer une marge, voir venir une tension
                de trésorerie.
              </p>
            </div>

            <ol className="space-y-8">
              {[
                {
                  titre: "Un premier échange qui engage à rien",
                  texte:
                    "Nous faisons le point sur votre activité et vos obligations. Ce rendez-vous sert d'abord à vérifier que nous sommes le bon interlocuteur pour vous — et à vous le dire franchement si ce n'est pas le cas.",
                },
                {
                  titre: "Un périmètre écrit avant de commencer",
                  texte:
                    "Missions, obligations réciproques et honoraires figurent dans une lettre de mission. Aucun travail ne démarre sans ce document signé.",
                },
                {
                  titre: "Un suivi tout au long de l'exercice",
                  texte:
                    "Points d'étape et alertes en cours d'année, plutôt qu'une découverte des difficultés au moment du bilan.",
                },
                {
                  titre: "Des chiffres expliqués",
                  texte:
                    "Vos comptes vous sont présentés et commentés. L'objectif est que vous les compreniez, pas seulement que vous les signiez.",
                },
              ].map((etape, index) => (
                <li key={etape.titre} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 font-titre text-2xl text-laiton-clair"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-titre text-lg">{etape.titre}</h3>
                    <p className="mt-1.5 text-ardoise-700">{etape.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Conteneur>
      </Section>

      {/* ── Actualités ───────────────────────────────────────────────── */}
      {articles.length > 0 && (
        <Section>
          <Conteneur taille="large">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Surtitre>Actualités</Surtitre>
                <h2 className="font-titre text-3xl">
                  Comprendre ce qui change
                </h2>
              </div>
              <Link
                href="/actualites"
                className="text-sm font-medium text-laiton underline underline-offset-2 hover:text-encre"
              >
                Toutes les actualités
              </Link>
            </div>

            <ul className="mt-10 grid gap-8 sm:grid-cols-3">
              {articles.map((article) => (
                <li key={article.slug}>
                  <article>
                    <p className="text-xs uppercase tracking-wide text-laiton">
                      {article.categorie}
                    </p>
                    <h3 className="mt-2 font-titre text-lg leading-snug">
                      <Link
                        href={`/actualites/${article.slug}`}
                        className="hover:text-laiton"
                      >
                        {article.titre}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-ardoise-500">
                      {article.chapo}
                    </p>
                    <p className="mt-3 text-xs text-ardoise-500">
                      <time dateTime={article.publieLe}>
                        {formaterDate(article.publieLe)}
                      </time>{" "}
                      · {article.dureeLecture} min de lecture
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </Conteneur>
        </Section>
      )}

      <BlocCta />
    </>
  );
}
