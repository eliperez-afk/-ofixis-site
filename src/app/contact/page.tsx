import type { Metadata } from "next";
import { CABINET } from "@/config/cabinet";
import { lienEspaceClient } from "@/config/navigation";
import { Conteneur } from "@/components/conteneur";
import { FilAriane } from "@/components/fil-ariane";
import { FormulaireContact } from "@/components/formulaire-contact";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  titre: "Contact",
  description:
    "Contactez le cabinet OFIXIS à Levallois-Perret : téléphone, e-mail ou formulaire. Premier échange sans engagement.",
  chemin: "/contact",
});

export default function PageContact() {
  const telephone = CABINET.telephone.valeur;
  const adresse = CABINET.adresse.valeur;
  const espaceClient = lienEspaceClient();

  return (
    <Conteneur taille="large">
      <div className="py-8">
        <FilAriane elements={[{ libelle: "Contact", href: "/contact" }]} />
      </div>

      <div className="max-w-2xl pb-12">
        <h1 className="font-titre text-4xl sm:text-5xl">Nous contacter</h1>
        <p className="mt-5 text-lg text-ardoise-700">
          Décrivez-nous votre situation en quelques lignes. Nous revenons vers
          vous par le canal que vous préférez.
        </p>
      </div>

      <div className="grid gap-12 pb-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <h2 className="sr-only">Formulaire de contact</h2>
          <FormulaireContact />
        </div>

        <aside className="h-fit space-y-8">
          <div className="rounded-carte border border-bordure bg-white p-6">
            <h2 className="font-titre text-lg">Directement</h2>

            <dl className="mt-5 space-y-5 text-[0.95rem]">
              <div>
                <dt className="text-sm text-ardoise-500">Téléphone</dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${telephone.lien}`}
                    className="text-lg text-laiton underline underline-offset-2 hover:text-encre"
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
                    {CABINET.horaires.valeur.libelleJours},{" "}
                    {CABINET.horaires.valeur.libelleHeures}
                  </dd>
                </div>
              )}

              <div>
                <dt className="text-sm text-ardoise-500">Adresse</dt>
                <dd className="mt-1">
                  <address className="not-italic text-ardoise-900">
                    {adresse.rue}
                    <br />
                    {adresse.codePostal} {adresse.ville}
                  </address>
                </dd>
              </div>
            </dl>
          </div>

          {espaceClient && (
            <div className="rounded-carte border border-bordure bg-white p-6">
              <h2 className="font-titre text-lg">Vous êtes déjà client ?</h2>
              <p className="mt-2 text-sm text-ardoise-700">
                Pour transmettre des documents ou consulter votre dossier,
                utilisez l&apos;espace client sécurisé plutôt que ce formulaire.
              </p>
              <a
                href={espaceClient}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-douce border border-encre px-4 py-2.5 text-sm font-medium text-encre transition-colors hover:bg-craie-ombre"
              >
                Accéder à l&apos;espace client
                <span className="sr-only"> (nouvelle fenêtre)</span>
              </a>
            </div>
          )}

          <div className="rounded-carte bg-craie-ombre p-6 text-sm text-ardoise-700">
            <h2 className="font-titre text-base text-encre">
              Protection de vos données
            </h2>
            <p className="mt-2">
              Les informations que vous transmettez servent uniquement à traiter
              votre demande et à vous recontacter. Elles sont destinées au seul
              cabinet {CABINET.nom}, ne sont ni cédées ni revendues, et ne
              servent à aucune prospection publicitaire.
            </p>
            <p className="mt-2">
              Vous disposez de droits d&apos;accès, de rectification,
              d&apos;effacement, d&apos;opposition et de limitation sur ces
              données.
            </p>
          </div>
        </aside>
      </div>
    </Conteneur>
  );
}
