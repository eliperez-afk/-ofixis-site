import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MISSIONS, trouverMission } from "@/content/missions";
import { EST_PRODUCTION } from "@/config/cabinet";
import { Conteneur } from "@/components/conteneur";
import { FilAriane } from "@/components/fil-ariane";
import { BlocCta } from "@/components/bloc-cta";
import { metadonnees } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

/** Génération statique : chaque page mission est produite au build. */
export function generateStaticParams() {
  return MISSIONS.map((mission) => ({ slug: mission.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mission = trouverMission(slug);
  if (!mission) return {};

  return metadonnees({
    titre: mission.metaTitre,
    description: mission.metaDescription,
    chemin: `/missions/${mission.slug}`,
  });
}

export default async function PageMission({ params }: Props) {
  const { slug } = await params;
  const mission = trouverMission(slug);
  if (!mission) notFound();

  const liees = mission.missionsLiees
    .map((autre) => trouverMission(autre))
    .filter((autre) => autre !== undefined);

  return (
    <>
      <Conteneur taille="large">
        <div className="py-8">
          <FilAriane
            elements={[
              { libelle: "Missions", href: "/missions" },
              { libelle: mission.titre, href: `/missions/${mission.slug}` },
            ]}
          />
        </div>
      </Conteneur>

      {/* Marqueur de relecture, jamais affiché en production. */}
      {!EST_PRODUCTION && mission.statutRedaction === "brouillon" && (
        <Conteneur taille="large">
          <p className="mb-6 rounded-carte border border-laiton-clair bg-laiton-pale px-4 py-3 text-sm text-ardoise-900">
            <strong>Brouillon.</strong> Ce texte décrit la mission telle
            qu&apos;elle s&apos;exerce habituellement. Le périmètre exact doit
            être confirmé par le cabinet avant publication.
          </p>
        </Conteneur>
      )}

      <Conteneur taille="large">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h1 className="font-titre text-4xl sm:text-5xl">{mission.titre}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ardoise-700">
              {mission.chapo}
            </p>

            <div className="mt-10 space-y-4 text-ardoise-900">
              {mission.probleme.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-carte border border-bordure bg-white p-6">
            <h2 className="font-titre text-lg">Pour qui</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ardoise-700">
              {mission.pourQui.map((public_) => (
                <li key={public_} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-laiton-clair" />
                  {public_}
                </li>
              ))}
            </ul>

            <Link
              href="/prendre-rendez-vous"
              className="mt-6 block rounded-douce bg-encre px-5 py-3 text-center font-medium text-white transition-colors hover:bg-ardoise-900"
            >
              Prendre rendez-vous
            </Link>
          </aside>
        </div>
      </Conteneur>

      {/* ── Contenu de la mission ─────────────────────────────────────── */}
      <section className="border-y border-bordure bg-white py-16">
        <Conteneur taille="large">
          <h2 className="font-titre text-3xl">Ce que comprend la mission</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {mission.contenu.map((bloc) => (
              <div key={bloc.titre}>
                <h3 className="font-titre text-lg text-encre">{bloc.titre}</h3>
                <p className="mt-2 text-ardoise-700">{bloc.texte}</p>
              </div>
            ))}
          </div>
        </Conteneur>
      </section>

      {/* ── Déroulement ───────────────────────────────────────────────── */}
      <section className="py-16">
        <Conteneur taille="large">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <h2 className="font-titre text-3xl">Comment cela se passe</h2>
              <div className="mt-8 rounded-carte border border-bordure bg-white p-6">
                <h3 className="font-titre text-base">Ce que vous recevez</h3>
                <ul className="mt-3 space-y-2 text-sm text-ardoise-700">
                  {mission.livrables.map((livrable) => (
                    <li key={livrable} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-laiton-clair" />
                      {livrable}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ol className="space-y-7">
              {mission.deroulement.map((etape, index) => (
                <li key={etape.titre} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 font-titre text-xl text-laiton-clair"
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
      </section>

      {/* ── Questions fréquentes ──────────────────────────────────────── */}
      <section className="border-t border-bordure bg-white py-16">
        <Conteneur taille="etroite">
          <h2 className="font-titre text-3xl">Questions fréquentes</h2>
          <dl className="mt-8 divide-y divide-bordure border-y border-bordure">
            {mission.questions.map((question) => (
              <div key={question.question} className="py-6">
                <dt className="font-titre text-lg text-encre">
                  {question.question}
                </dt>
                <dd className="mt-2.5 text-ardoise-700">{question.reponse}</dd>
              </div>
            ))}
          </dl>

          {liees.length > 0 && (
            <div className="mt-12">
              <h2 className="font-titre text-xl">Missions liées</h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {liees.map((autre) => (
                  <li key={autre.slug}>
                    <Link
                      href={`/missions/${autre.slug}`}
                      className="inline-block rounded-douce border border-bordure px-4 py-2 text-sm text-ardoise-700 transition-colors hover:border-laiton hover:text-laiton"
                    >
                      {autre.titreCourt}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Conteneur>
      </section>

      <BlocCta />
    </>
  );
}
