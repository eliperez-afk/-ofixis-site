import Link from "next/link";
import { CABINET } from "@/config/cabinet";
import { Conteneur } from "./conteneur";

/**
 * Bloc d'appel à l'action de fin de page.
 * Deux actions seulement, sans insistance : prendre rendez-vous ou appeler.
 */
export function BlocCta({
  titre = "Parlons de votre situation",
  texte = "Un premier échange permet de comprendre votre besoin et de vous dire si nous sommes le bon interlocuteur.",
}: {
  titre?: string;
  texte?: string;
}) {
  const telephone = CABINET.telephone.valeur;

  return (
    <section className="bg-encre text-white">
      <Conteneur taille="normale">
        <div className="py-14 sm:py-16">
          <h2 className="font-titre text-2xl sm:text-3xl">{titre}</h2>
          <p className="mt-3 max-w-2xl text-ardoise-100">{texte}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/prendre-rendez-vous"
              className="rounded-douce bg-laiton-clair px-5 py-3 text-center font-medium text-encre transition-colors hover:bg-white"
            >
              Prendre rendez-vous
            </Link>
            <a
              href={`tel:${telephone.lien}`}
              className="rounded-douce border border-ardoise-500 px-5 py-3 text-center font-medium text-white transition-colors hover:border-white"
            >
              Appeler le {telephone.affichage}
            </a>
          </div>
        </div>
      </Conteneur>
    </section>
  );
}
