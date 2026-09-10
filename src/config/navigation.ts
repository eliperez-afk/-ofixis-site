import { CABINET, EQUIPE } from "./cabinet";
import { MISSIONS } from "@/content/missions";

export type LienNavigation = {
  libelle: string;
  href: string;
  /** Sous-menu affiché dans l'en-tête et repris dans le pied de page. */
  enfants?: { libelle: string; href: string }[];
};

/**
 * Navigation principale.
 *
 * Une page n'apparaît dans la navigation que si elle a un contenu réel :
 * la page « Équipe » reste masquée tant qu'aucun collaborateur n'a donné son
 * consentement écrit de publication.
 */
export function navigationPrincipale(): LienNavigation[] {
  const liens: LienNavigation[] = [
    { libelle: "Le cabinet", href: "/cabinet" },
    {
      libelle: "Missions",
      href: "/missions",
      enfants: MISSIONS.map((mission) => ({
        libelle: mission.titreCourt,
        href: `/missions/${mission.slug}`,
      })),
    },
    { libelle: "Actualités", href: "/actualites" },
    { libelle: "Contact", href: "/contact" },
  ];

  if (EQUIPE.length > 0) {
    liens.splice(1, 0, { libelle: "Équipe", href: "/equipe" });
  }

  return liens;
}

/** Liens légaux du pied de page. */
export const liensLegaux = [
  { libelle: "Mentions légales", href: "/mentions-legales" },
  { libelle: "Politique de confidentialité", href: "/politique-confidentialite" },
  { libelle: "Accessibilité", href: "/accessibilite" },
];

/** Le lien « Espace client » n'existe que si son URL réelle est configurée. */
export function lienEspaceClient(): string | null {
  return CABINET.liens.espaceClient;
}
