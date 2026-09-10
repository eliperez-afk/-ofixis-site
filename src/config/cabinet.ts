/**
 * Source unique de vérité pour les informations du cabinet.
 *
 * Toute information affichée sur le site provient de ce fichier — y compris les
 * données structurées JSON-LD. Corriger une adresse ou un numéro ici le corrige
 * partout, ce qui évite les contradictions relevées sur l'ancien site.
 *
 * `statut` documente l'état de validation de chaque donnée :
 *   - "confirme"     : validé par écrit par le cabinet
 *   - "a_confirmer"  : collecté mais non validé — bloque la mise en production
 *
 * Le script `npm run check:contenu` refuse la mise en production tant qu'une
 * donnée reste au statut "a_confirmer".
 */

export type StatutDonnee = "confirme" | "a_confirmer";

export type Donnee<T> = {
  valeur: T;
  statut: StatutDonnee;
  /** Origine de l'information et date de validation. */
  source: string;
};

const confirme = <T,>(valeur: T, source: string): Donnee<T> => ({
  valeur,
  statut: "confirme",
  source,
});

const aConfirmer = <T,>(valeur: T, source: string): Donnee<T> => ({
  valeur,
  statut: "a_confirmer",
  source,
});

/** Validation du dirigeant, 9 septembre 2026. */
const VALIDATION_DIRIGEANT = "Validé par le dirigeant le 2026-09-09";

export const CABINET = {
  nom: "OFIXIS",
  nomComplet: "OFIXIS",

  activite:
    "Cabinet d'expertise comptable et de commissariat aux comptes",

  /**
   * Un seul bureau. Les implantations Paris 16e, Noisy-le-Sec, Provins et
   * Saint-Mandé qui figuraient sur l'ancien site n'existent plus
   * (confirmé par le dirigeant le 9 septembre 2026).
   */
  adresse: confirme(
    {
      rue: "90 rue Chaptal",
      codePostal: "92300",
      ville: "Levallois-Perret",
      pays: "France",
      regionAffichee: "Île-de-France",
    },
    VALIDATION_DIRIGEANT,
  ),

  /**
   * Numéro unique. Ligne mobile à titre provisoire : une ligne téléphonique
   * fixe est en cours de création et remplacera cette valeur.
   */
  telephone: confirme(
    {
      affichage: "06 50 28 12 86",
      lien: "+33650281286",
      /** Ligne fixe à venir — remplacer `affichage` et `lien` le moment venu. */
      provisoire: true,
    },
    VALIDATION_DIRIGEANT,
  ),

  email: aConfirmer("contact@ofixis.fr", "Ancien site — à reconfirmer"),

  /** Horaires d'ouverture — non communiqués à ce jour. */
  horaires: aConfirmer<null | { jours: string; heures: string }[]>(
    null,
    "Non communiqué",
  ),

  // ── Identité légale ────────────────────────────────────────────────────
  legal: {
    raisonSociale: aConfirmer("OFIXIS", "Registres publics — à reconfirmer"),
    formeJuridique: aConfirmer("SARL", "Registres publics — à reconfirmer"),
    capital: aConfirmer("1 000 €", "Ancien site — à reconfirmer"),
    siren: aConfirmer(
      "841 080 971",
      "annuaire-entreprises.data.gouv.fr — à reconfirmer",
    ),
    /**
     * L'ancien site indiquait « RCS Bobigny », cohérent avec un siège à
     * Noisy-le-Sec. Le siège étant désormais à Levallois-Perret, la ville
     * du RCS doit être reconfirmée (Nanterre selon toute vraisemblance).
     */
    villeRcs: aConfirmer("", "Incohérence relevée — arbitrage requis"),
    tvaIntracommunautaire: aConfirmer("", "Non communiqué"),
    directeurPublication: aConfirmer("Eli Perez", "Ancien site — à reconfirmer"),
    numeroOrdre: aConfirmer("140000548701", "Ancien site — à reconfirmer"),
    numeroCncc: aConfirmer("4100090432", "Ancien site — à reconfirmer"),
    hebergeur: aConfirmer<null | {
      nom: string;
      adresse: string;
      telephone: string;
    }>(null, "Hébergement non arrêté"),
  },

  // ── Données personnelles ───────────────────────────────────────────────
  rgpd: {
    /** Durée de conservation des demandes entrantes. */
    conservationProspects: aConfirmer(
      "3 ans à compter du dernier contact",
      "Proposition par défaut — à valider",
    ),
    adresseExerciceDroits: aConfirmer("", "Non communiqué"),
    delegueProtectionDonnees: aConfirmer<null | string>(null, "Non communiqué"),
  },

  // ── Liens externes ─────────────────────────────────────────────────────
  /**
   * Ces liens ne sont affichés que lorsqu'ils sont renseignés.
   * Aucun bouton ne pointe vers une URL inventée ou vers un écran de
   * connexion simulé.
   */
  liens: {
    espaceClient: process.env.NEXT_PUBLIC_URL_ESPACE_CLIENT || null,
    bookings: process.env.NEXT_PUBLIC_URL_BOOKINGS || null,
    linkedin: aConfirmer(
      "https://fr.linkedin.com/company/ofixis",
      "Résultat de recherche — à reconfirmer",
    ),
  },
} as const;

/** URL canonique du site, sans slash final. */
export const URL_SITE = (
  process.env.NEXT_PUBLIC_URL_SITE || "https://www.ofixis.fr"
).replace(/\/$/, "");

export const EST_PRODUCTION =
  process.env.NEXT_PUBLIC_ENVIRONNEMENT === "production";

/** Adresse postale sur une ligne. */
export function adresseUneLigne(): string {
  const a = CABINET.adresse.valeur;
  return `${a.rue}, ${a.codePostal} ${a.ville}`;
}

/**
 * Équipe du cabinet.
 *
 * Volontairement vide : aucune personne ne peut être publiée sans son
 * consentement écrit (nom, fonction exacte, statut d'inscription, portrait).
 * Tant que ce tableau est vide, la page « Équipe » n'est ni générée, ni liée
 * dans la navigation, ni présente dans le sitemap.
 */
export type MembreEquipe = {
  slug: string;
  nom: string;
  fonction: string;
  /** Inscription à l'Ordre des experts-comptables et/ou à la CNCC. */
  inscriptions: string[];
  biographie: string;
  portrait: string | null;
};

export const EQUIPE: MembreEquipe[] = [];

/**
 * Chiffres clés.
 *
 * Volontairement vide. Les chiffres de l'ancien site (30 collaborateurs,
 * plus de 700 clients) ont été signalés comme erronés par le dirigeant.
 * Un chiffre ne sera publié qu'accompagné de sa date et de son périmètre.
 */
export type ChiffreCle = {
  valeur: string;
  libelle: string;
  precision: string;
};

export const CHIFFRES_CLES: ChiffreCle[] = [];
