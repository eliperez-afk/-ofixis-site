import { CABINET, URL_SITE, adresseUneLigne } from "@/config/cabinet";

/**
 * Données structurées JSON-LD.
 *
 * Règle appliquée sans exception : le balisage ne décrit que ce qui est
 * réellement visible sur la page et confirmé par le cabinet. Aucune donnée
 * inventée, aucune note d'avis, aucune coordonnée géographique approximative,
 * aucun horaire supposé.
 *
 * `FAQPage` n'est volontairement pas émis : depuis 2023, Google réserve ce
 * type de résultat enrichi aux sites gouvernementaux et de santé faisant
 * autorité. L'émettre ici n'apporterait rien et ajouterait du balisage inutile.
 */

type Json = Record<string, unknown>;

/** Fiche de l'organisation et de son unique établissement. */
export function jsonLdOrganisation(): Json {
  const adresse = CABINET.adresse.valeur;
  const horaires = CABINET.horaires;

  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${URL_SITE}/#organisation`,
    name: CABINET.nom,
    description: CABINET.activite,
    url: URL_SITE,
    telephone: CABINET.telephone.valeur.lien,
    address: {
      "@type": "PostalAddress",
      streetAddress: adresse.rue,
      postalCode: adresse.codePostal,
      addressLocality: adresse.ville,
      addressCountry: "FR",
    },
    areaServed: { "@type": "AdministrativeArea", name: adresse.regionAffichee },
    // Les horaires ne sont balisés que lorsqu'ils sont confirmés : un horaire
    // erroné dans une fiche de moteur de recherche envoie un prospect devant
    // une porte close.
    ...(horaires.statut === "confirme" && horaires.valeur
      ? {
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: horaires.valeur.jours,
              opens: horaires.valeur.ouverture,
              closes: horaires.valeur.fermeture,
            },
          ],
        }
      : {}),
  };
}

export function jsonLdSiteWeb(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${URL_SITE}/#site`,
    url: URL_SITE,
    name: CABINET.nom,
    inLanguage: "fr-FR",
    publisher: { "@id": `${URL_SITE}/#organisation` },
  };
}

export function jsonLdFilAriane(
  elements: { libelle: string; href: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements.map((element, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: element.libelle,
      item: `${URL_SITE}${element.href}`,
    })),
  };
}

export function jsonLdArticle({
  titre,
  description,
  chemin,
  publieLe,
  modifieLe,
  auteur,
}: {
  titre: string;
  description: string;
  chemin: string;
  publieLe: string;
  modifieLe?: string;
  auteur: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titre,
    description,
    datePublished: publieLe,
    dateModified: modifieLe ?? publieLe,
    author: { "@type": "Person", name: auteur },
    publisher: { "@id": `${URL_SITE}/#organisation` },
    mainEntityOfPage: `${URL_SITE}${chemin}`,
    inLanguage: "fr-FR",
  };
}

/** Adresse lisible, utilisée aussi bien à l'écran que dans le balisage. */
export const adresseTexte = adresseUneLigne;
