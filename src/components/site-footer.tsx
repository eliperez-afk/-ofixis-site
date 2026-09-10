import Link from "next/link";
import { CABINET, adresseUneLigne } from "@/config/cabinet";
import { navigationPrincipale, liensLegaux, lienEspaceClient } from "@/config/navigation";
import { MISSIONS } from "@/content/missions";
import { Conteneur } from "./conteneur";

export function SiteFooter() {
  const telephone = CABINET.telephone.valeur;
  const adresse = CABINET.adresse.valeur;
  const espaceClient = lienEspaceClient();
  const annee = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-bordure bg-white">
      <Conteneur taille="large">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Coordonnées */}
          <div>
            <p className="font-titre text-lg text-encre">{CABINET.nom}</p>
            <p className="mt-2 text-sm text-ardoise-500">{CABINET.activite}</p>

            <address className="mt-5 space-y-2 text-sm not-italic text-ardoise-700">
              <p>
                {adresse.rue}
                <br />
                {adresse.codePostal} {adresse.ville}
              </p>
              <p>
                <a
                  href={`tel:${telephone.lien}`}
                  className="hover:text-laiton hover:underline"
                >
                  {telephone.affichage}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CABINET.email.valeur}`}
                  className="hover:text-laiton hover:underline"
                >
                  {CABINET.email.valeur}
                </a>
              </p>
            </address>
          </div>

          {/* Navigation */}
          <nav aria-label="Pied de page — le cabinet">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ardoise-500">
              Le cabinet
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {navigationPrincipale().map((lien) => (
                <li key={lien.href}>
                  <Link href={lien.href} className="text-ardoise-700 hover:text-laiton">
                    {lien.libelle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/prendre-rendez-vous"
                  className="text-ardoise-700 hover:text-laiton"
                >
                  Prendre rendez-vous
                </Link>
              </li>
              {espaceClient && (
                <li>
                  <a
                    href={espaceClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ardoise-700 hover:text-laiton"
                  >
                    Espace client
                    <span className="sr-only"> (nouvelle fenêtre)</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>

          {/* Missions */}
          <nav aria-label="Pied de page — missions" className="sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ardoise-500">
              Missions
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {MISSIONS.map((mission) => (
                <li key={mission.slug}>
                  <Link
                    href={`/missions/${mission.slug}`}
                    className="text-ardoise-700 hover:text-laiton"
                  >
                    {mission.titreCourt}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Informations réglementaires */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ardoise-500">
              Informations
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {liensLegaux.map((lien) => (
                <li key={lien.href}>
                  <Link href={lien.href} className="text-ardoise-700 hover:text-laiton">
                    {lien.libelle}
                  </Link>
                </li>
              ))}
            </ul>

            {/*
              Les numéros d'inscription à l'Ordre et à la CNCC ne sont affichés
              qu'une fois confirmés par le cabinet : ce sont des mentions
              réglementaires, une valeur erronée serait un manquement.
            */}
            {CABINET.legal.numeroOrdre.statut === "confirme" && (
              <p className="mt-5 text-xs leading-relaxed text-ardoise-500">
                Inscrit au tableau de l&apos;Ordre des experts-comptables
                d&apos;Île-de-France sous le n° {CABINET.legal.numeroOrdre.valeur}.
                {CABINET.legal.numeroCncc.statut === "confirme" && (
                  <>
                    {" "}
                    Inscrit à la Compagnie nationale des commissaires aux comptes
                    sous le n° {CABINET.legal.numeroCncc.valeur}.
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-bordure py-6 text-xs text-ardoise-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {annee} {CABINET.nom} — {adresseUneLigne()}
          </p>
          <p>
            Les informations générales publiées sur ce site ne remplacent pas une
            consultation adaptée à votre situation.
          </p>
        </div>
      </Conteneur>
    </footer>
  );
}
