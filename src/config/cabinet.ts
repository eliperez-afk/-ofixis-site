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

/** Validations écrites du dirigeant. */
const VALIDATION_DIRIGEANT = "Validé par le dirigeant le 2026-09-09";
const VALIDATION_MENTIONS = "Mentions légales transmises par le dirigeant le 2026-09-10";
const VALIDATION_COMPLEMENTS =
  "Compléments confirmés par le dirigeant le 2026-09-10";

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

  email: confirme("contact@ofixis.fr", VALIDATION_MENTIONS),

  /** Horaires d'ouverture — non communiqués à ce jour. */
  horaires: aConfirmer<null | { jours: string; heures: string }[]>(
    null,
    "Non communiqué",
  ),

  // ── Identité légale ────────────────────────────────────────────────────
  legal: {
    raisonSociale: confirme("OFIXIS", VALIDATION_MENTIONS),
    formeJuridique: confirme(
      "société à responsabilité limitée",
      VALIDATION_MENTIONS,
    ),
    capital: confirme("1 000 €", VALIDATION_MENTIONS),
    siren: confirme("841 080 971", VALIDATION_MENTIONS),
    /**
     * L'ancien site indiquait « RCS Bobigny », cohérent avec l'ancien siège de
     * Noisy-le-Sec. Le siège étant désormais à Levallois-Perret, le cabinet
     * relève bien du RCS de Nanterre.
     */
    villeRcs: confirme("Nanterre", VALIDATION_MENTIONS),
    /**
     * Clé de contrôle vérifiée : (12 + 3 × (841080971 mod 97)) mod 97 = 64.
     * Le numéro fourni est donc arithmétiquement cohérent avec le SIREN.
     */
    tvaIntracommunautaire: confirme("FR 64 841 080 971", VALIDATION_COMPLEMENTS),
    directeurPublication: confirme("Eli Perez", VALIDATION_COMPLEMENTS),
    numeroOrdre: confirme("140000548701", VALIDATION_COMPLEMENTS),
    numeroCncc: confirme("4100090432", VALIDATION_COMPLEMENTS),
    /**
     * Hébergeur validé par le dirigeant le 10 septembre 2026.
     *
     * Vercel ne publie pas de numéro de téléphone d'assistance : le champ
     * `contact` renvoie donc vers le canal de support officiel. L'article 6-III
     * de la LCEN mentionne un numéro de téléphone ; à défaut, l'indication du
     * moyen de contact réellement disponible est la formulation la plus exacte
     * possible. Un hébergeur français publiant une ligne téléphonique lèverait
     * cette réserve — voir CADRAGE_TECHNIQUE.md.
     */
    hebergeur: confirme<null | {
      nom: string;
      adresse: string;
      contact: string;
    }>(
      {
        nom: "Vercel Inc.",
        adresse: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
        contact: "https://vercel.com/help",
      },
      VALIDATION_COMPLEMENTS,
    ),

    /**
     * Assurance de responsabilité civile professionnelle.
     *
     * Les éléments ci-dessous proviennent de l'appel de prime transmis par le
     * cabinet, qui porte sur l'exercice **2020**. Ils ne sont pas publiables en
     * l'état : l'assureur, le numéro de police et la couverture géographique
     * doivent être confirmés par une attestation en cours de validité.
     * Publier des garanties périmées serait une information inexacte au sens
     * de l'article 152 du Code de déontologie.
     */
    assuranceRcp: aConfirmer<null | {
      assureur: string;
      courtier: string;
      numeroPolice: string;
      couvertureGeographique: string;
    }>(
      {
        assureur:
          "MMA IARD / MMA IARD Assurances Mutuelles, 160 rue Henri Champion, 72030 Le Mans Cedex 9",
        courtier:
          "Verspieren, 1 avenue François Mitterrand, BP 30200, 59446 Wasquehal Cedex (ORIAS 07 001 542)",
        numeroPolice: "118269730",
        couvertureGeographique: "",
      },
      "Appel de prime 2020 — attestation en cours de validité annoncée par le dirigeant le 2026-09-10, en attente de réception",
    ),
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
