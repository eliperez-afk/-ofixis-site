import type { Metadata } from "next";
import { CABINET, adresseUneLigne } from "@/config/cabinet";
import { Conteneur } from "@/components/conteneur";
import { FilAriane } from "@/components/fil-ariane";
import { Valeur } from "@/components/valeur-a-confirmer";
import { metadonnees } from "@/lib/seo";

export const metadata: Metadata = metadonnees({
  titre: "Mentions légales",
  description:
    "Mentions légales du site du cabinet OFIXIS : éditeur, directeur de la publication, hébergeur et propriété intellectuelle.",
  chemin: "/mentions-legales",
});

/**
 * Identité de l'éditeur validée par le dirigeant le 10 septembre 2026 :
 * SARL au capital de 1 000 €, RCS Nanterre 841 080 971, siège 90 rue Chaptal
 * à Levallois-Perret.
 *
 * Reste à confirmer : l'assurance de responsabilité civile professionnelle,
 * l'attestation transmise portant sur l'exercice 2020. Cet élément s'affiche
 * explicitement comme « à confirmer » et bloque la mise en production
 * (art. 6-III de la LCEN).
 */
export default function PageMentionsLegales() {
  const legal = CABINET.legal;

  return (
    <Conteneur taille="etroite">
      <div className="py-8">
        <FilAriane
          elements={[{ libelle: "Mentions légales", href: "/mentions-legales" }]}
        />
      </div>

      <div className="pb-20">
        <h1 className="font-titre text-4xl">Mentions légales</h1>

        <div className="prose-ofixis mt-10">
          <h2>Éditeur du site</h2>
          <p>
            Le site www.ofixis.fr est édité par{" "}
            <Valeur donnee={legal.raisonSociale} />, société à responsabilité
            limitée au capital social de <Valeur donnee={legal.capital} />,
            immatriculée au registre du commerce et des sociétés de{" "}
            <Valeur donnee={legal.villeRcs} /> sous le numéro{" "}
            <Valeur donnee={legal.siren} />, dont le siège social est situé{" "}
            {adresseUneLigne()}.
          </p>

          <h3>Coordonnées</h3>
          <ul>
            <li>Adresse postale : {CABINET.nom}, {adresseUneLigne()}</li>
            <li>Téléphone : {CABINET.telephone.valeur.affichage}</li>
            <li>
              Adresse électronique : <Valeur donnee={CABINET.email} />
            </li>
            <li>
              Numéro de TVA intracommunautaire :{" "}
              <Valeur donnee={legal.tvaIntracommunautaire} />
            </li>
          </ul>

          <h2>Directeur de la publication</h2>
          <p>
            <Valeur donnee={legal.directeurPublication} />
          </p>

          <h2>Inscriptions professionnelles</h2>
          <p>
            Le cabinet est inscrit au tableau de l&apos;Ordre des
            experts-comptables d&apos;Île-de-France sous le numéro{" "}
            <Valeur donnee={legal.numeroOrdre} />, et à la Compagnie nationale
            des commissaires aux comptes sous le numéro{" "}
            <Valeur donnee={legal.numeroCncc} />.
          </p>
          <p>
            L&apos;exercice de ces professions est régi par l&apos;ordonnance
            n° 45-2138 du 19 septembre 1945, par le Code de commerce et par le
            Code de déontologie des professionnels de l&apos;expertise comptable.
          </p>

          <h2>Assurance responsabilité civile professionnelle</h2>
          {legal.assuranceRcp.statut === "confirme" && legal.assuranceRcp.valeur ? (
            <>
              <p>
                Le cabinet est couvert par une assurance de responsabilité civile
                professionnelle souscrite auprès de{" "}
                {legal.assuranceRcp.valeur.assureur}, par l&apos;intermédiaire de{" "}
                {legal.assuranceRcp.valeur.courtier}, sous le numéro de police{" "}
                {legal.assuranceRcp.valeur.numeroPolice}.
              </p>
              <p>
                Couverture géographique :{" "}
                {legal.assuranceRcp.valeur.couvertureGeographique}.
              </p>
            </>
          ) : (
            <p>
              Le cabinet est couvert par une assurance de responsabilité civile
              professionnelle, obligatoire pour tout professionnel inscrit. Les
              coordonnées de l&apos;assureur, le numéro de police et la
              couverture géographique restent{" "}
              <mark className="rounded-sm bg-laiton-pale px-1.5 py-0.5 text-ardoise-700">
                à confirmer sur attestation en cours de validité
              </mark>
              .
            </p>
          )}

          <h2>Hébergement</h2>
          {legal.hebergeur.statut === "confirme" && legal.hebergeur.valeur ? (
            <>
              <p>Le site est hébergé par :</p>
              <ul>
                <li>{legal.hebergeur.valeur.nom}</li>
                <li>{legal.hebergeur.valeur.adresse}</li>
                <li>
                  Assistance :{" "}
                  <a
                    href={legal.hebergeur.valeur.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {legal.hebergeur.valeur.contact}
                    <span className="sr-only"> (nouvelle fenêtre)</span>
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <p>
              <mark className="rounded-sm bg-laiton-pale px-1.5 py-0.5 text-ardoise-700">
                Hébergeur à confirmer
              </mark>{" "}
              — nom, raison sociale, adresse et numéro de téléphone doivent
              figurer ici, conformément à l&apos;article 6-III de la loi pour la
              confiance dans l&apos;économie numérique.
            </p>
          )}

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus de ce site — textes, mise en page,
            identité visuelle — est protégé par le droit de la propriété
            intellectuelle. Toute reproduction ou représentation, totale ou
            partielle, sans autorisation écrite préalable, est interdite.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Le traitement des données collectées par ce site est décrit dans la{" "}
            <a href="/politique-confidentialite">
              politique de confidentialité
            </a>
            .
          </p>

          <h2>Responsabilité</h2>
          <p>
            Les informations générales publiées sur ce site sont fournies à titre
            indicatif et à jour à leur date de publication. Elles ne constituent
            pas une consultation et ne sauraient se substituer à un conseil
            adapté à une situation particulière. Le cabinet ne peut être tenu
            responsable de l&apos;usage qui en serait fait sans validation
            préalable.
          </p>
        </div>
      </div>
    </Conteneur>
  );
}
