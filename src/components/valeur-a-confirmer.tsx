import type { Donnee } from "@/config/cabinet";

/**
 * Affiche une donnée légale.
 *
 * Une donnée non validée par le cabinet n'est jamais affichée comme si elle
 * était certaine : elle apparaît explicitement comme restant à confirmer.
 * C'est visible, volontairement — une mention légale approximative est un
 * manquement, pas un détail de rédaction.
 */
export function Valeur({ donnee }: { donnee: Donnee<string> }) {
  if (donnee.statut === "confirme" && donnee.valeur) {
    return <>{donnee.valeur}</>;
  }

  return (
    <mark className="rounded-sm bg-laiton-pale px-1.5 py-0.5 text-ardoise-700">
      {donnee.valeur ? `${donnee.valeur} — à confirmer` : "à confirmer"}
    </mark>
  );
}
