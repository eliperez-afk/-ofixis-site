import Link from "next/link";
import { Conteneur } from "@/components/conteneur";
import { MISSIONS } from "@/content/missions";
import { CABINET } from "@/config/cabinet";

export default function PageIntrouvable() {
  return (
    <Conteneur taille="etroite">
      <div className="py-20 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-laiton">
          Erreur 404
        </p>
        <h1 className="mt-3 font-titre text-3xl sm:text-4xl">
          Cette page n&apos;existe pas
        </h1>
        <p className="mt-4 text-ardoise-700">
          Le lien est peut-être ancien, ou l&apos;adresse comporte une erreur.
          Voici les pages les plus consultées.
        </p>

        <ul className="mt-8 space-y-2">
          {MISSIONS.slice(0, 4).map((mission) => (
            <li key={mission.slug}>
              <Link
                href={`/missions/${mission.slug}`}
                className="text-laiton underline underline-offset-2 hover:text-encre"
              >
                {mission.titre}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="text-laiton underline underline-offset-2 hover:text-encre"
            >
              Contacter le cabinet
            </Link>
          </li>
        </ul>

        <p className="mt-8 text-ardoise-700">
          Vous cherchez quelque chose de précis ? Appelez-nous au{" "}
          <a
            href={`tel:${CABINET.telephone.valeur.lien}`}
            className="font-medium text-laiton underline underline-offset-2"
          >
            {CABINET.telephone.valeur.affichage}
          </a>
          .
        </p>
      </div>
    </Conteneur>
  );
}
