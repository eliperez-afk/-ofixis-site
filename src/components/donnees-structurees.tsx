/** Insère un bloc JSON-LD dans la page. */
export function DonneesStructurees({ donnees }: { donnees: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Le contenu provient exclusivement de nos propres fichiers de configuration.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
    />
  );
}
