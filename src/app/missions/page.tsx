import Link from "next/link";
import type { Metadata } from "next";
import { MISSIONS } from "@/content/missions";
import { Conteneur } from "@/components/conteneur";
import { FilAriane } from "@/components/fil-ariane";
import { BlocCta } from "@/components/bloc-cta";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  titre: "Nos missions",
  description:
    "Expertise comptable, fiscalité, paie, commissariat aux comptes, création d'entreprise, pilotage et transmission : les missions du cabinet OFIXIS.",
  chemin: "/missions",
});

export default function PageMissions() {
  return (
    <>
      <Conteneur taille="large">
        <div className="py-8">
          <FilAriane elements={[{ libelle: "Missions", href: "/missions" }]} />
        </div>

        <div className="max-w-2xl pb-12">
          <h1 className="font-titre text-4xl sm:text-5xl">Nos missions</h1>
          <p className="mt-5 text-lg text-ardoise-700">
            Chaque mission fait l&apos;objet d&apos;un périmètre défini avec vous
            et formalisé dans une lettre de mission signée avant tout démarrage.
          </p>
        </div>

        <ul className="grid gap-6 pb-20 md:grid-cols-2">
          {MISSIONS.map((mission) => (
            <li key={mission.slug}>
              <article className="flex h-full flex-col rounded-carte border border-bordure bg-white p-7">
                <h2 className="font-titre text-xl">
                  <Link
                    href={`/missions/${mission.slug}`}
                    className="hover:text-laiton"
                  >
                    {mission.titre}
                  </Link>
                </h2>
                <p className="mt-3 grow text-ardoise-700">{mission.chapo}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {mission.pourQui.slice(0, 3).map((public_) => (
                    <li
                      key={public_}
                      className="rounded-full bg-craie-ombre px-3 py-1 text-xs text-ardoise-700"
                    >
                      {public_}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/missions/${mission.slug}`}
                  className="mt-6 text-sm font-medium text-laiton underline underline-offset-2 hover:text-encre"
                >
                  Découvrir la mission
                  <span className="sr-only"> : {mission.titre}</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Conteneur>

      <BlocCta />
    </>
  );
}
