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
 * ⚠ Cette page contient des données restant à confirmer par le cabinet.
 *
 * L'ancien site indiquait un siège à Noisy-le-Sec et un RCS Bobigny, alors que
 * les registres publics rattachent OFIXIS à Levallois-Perret. Le siège étant
 * confirmé à Levallois-Perret, la ville du RCS doit être reconfirmée.
 * Des mentions légales inexactes contreviennent à l'article 6-III de la LCEN :
 * la mise en production est bloquée tant qu'elles ne sont pas validées.
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
            Le site {process.env.NEXT_PUBLIC_URL_SITE ?? "www.ofixis.fr"} est
            édité par :
          </p>
          <ul>
            <li>
              Dénomination sociale : <Valeur donnee={legal.raisonSociale} />
            </li>
            <li>
              Forme juridique : <Valeur donnee={legal.formeJuridique} />
            </li>
            <li>
              Capital social : <Valeur donnee={legal.capital} />
            </li>
            <li>Siège social : {adresseUneLigne()}</li>
            <li>
              SIREN : <Valeur donnee={legal.siren} />
            </li>
            <li>
              RCS : <Valeur donnee={legal.villeRcs} />
            </li>
            <li>
              Numéro de TVA intracommunautaire :{" "}
              <Valeur donnee={legal.tvaIntracommunautaire} />
            </li>
            <li>Téléphone : {CABINET.telephone.valeur.affichage}</li>
            <li>
              Adresse électronique : <Valeur donnee={CABINET.email} />
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
          <p>
            Le cabinet est couvert par une assurance de responsabilité civile
            professionnelle. Les coordonnées de l&apos;assureur et le numéro de
            police restent{" "}
            <mark className="rounded-sm bg-laiton-pale px-1.5 py-0.5 text-ardoise-700">
              à confirmer
            </mark>
            .
          </p>

          <h2>Hébergement</h2>
          {legal.hebergeur.valeur ? (
            <ul>
              <li>{legal.hebergeur.valeur.nom}</li>
              <li>{legal.hebergeur.valeur.adresse}</li>
              <li>{legal.hebergeur.valeur.telephone}</li>
            </ul>
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
