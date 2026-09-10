import { z } from "zod";

/**
 * Schéma de validation du formulaire de contact.
 *
 * Le même schéma est utilisé côté client (retours immédiats) et côté serveur
 * (contrôle qui fait foi). Le formulaire ne collecte volontairement aucune
 * donnée sensible ni aucun document : les échanges de pièces passent par
 * l'espace client sécurisé.
 */

const texteNettoye = (valeur: unknown) =>
  typeof valeur === "string" ? valeur.trim() : valeur;

export const OBJETS_DEMANDE = [
  "Premier rendez-vous",
  "Expertise comptable",
  "Commissariat aux comptes",
  "Paie et social",
  "Création ou reprise d'entreprise",
  "Autre demande",
] as const;

export const CANAUX_RAPPEL = ["Téléphone", "E-mail", "Visioconférence"] as const;

export const schemaContact = z.object({
  nom: z.preprocess(
    texteNettoye,
    z
      .string()
      .min(2, "Merci d'indiquer votre nom.")
      .max(100, "Ce nom est trop long."),
  ),
  entreprise: z.preprocess(
    texteNettoye,
    z.string().max(120, "Ce nom est trop long.").optional().or(z.literal("")),
  ),
  email: z.preprocess(
    texteNettoye,
    z
      .string()
      .min(1, "Merci d'indiquer votre adresse e-mail.")
      .email("Cette adresse e-mail ne semble pas valide.")
      .max(150),
  ),
  telephone: z.preprocess(
    texteNettoye,
    z
      .string()
      .regex(
        /^[0-9+\s().-]{6,20}$/,
        "Ce numéro ne semble pas valide. Vous pouvez aussi laisser ce champ vide.",
      )
      .optional()
      .or(z.literal("")),
  ),
  objet: z.enum(OBJETS_DEMANDE, {
    message: "Merci de choisir l'objet de votre demande.",
  }),
  message: z.preprocess(
    texteNettoye,
    z
      .string()
      .min(20, "Merci de détailler un peu votre demande (20 caractères minimum).")
      .max(4000, "Ce message est trop long. Merci de le résumer."),
  ),
  canalRappel: z.enum(CANAUX_RAPPEL, {
    message: "Merci d'indiquer comment vous préférez être recontacté.",
  }),
  consentement: z.literal(true, {
    message:
      "Merci d'accepter que vos coordonnées soient utilisées pour vous répondre.",
  }),
  /**
   * Champ leurre, invisible et non renseignable au clavier.
   * Un robot le remplit, un humain jamais : c'est la protection anti-spam
   * retenue, sans captcha tiers ni traceur.
   */
  siteWeb: z.string().max(0, "Requête rejetée.").optional().or(z.literal("")),
  /** Horodatage d'affichage du formulaire, pour écarter les envois instantanés. */
  affichéÀ: z.coerce.number().optional(),
});

export type DonneesContact = z.infer<typeof schemaContact>;
