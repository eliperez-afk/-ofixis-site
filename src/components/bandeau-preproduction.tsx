import { EST_PRODUCTION } from "@/config/cabinet";

/**
 * Bandeau affiché tant que le site n'est pas en production.
 * Il évite qu'une version de recette soit prise pour le site définitif, et
 * rappelle que les données non validées ne doivent pas être diffusées.
 */
export function BandeauPreproduction() {
  if (EST_PRODUCTION) return null;

  return (
    <div className="bg-encre px-5 py-2 text-center text-sm text-white">
      <strong className="font-semibold">Version de recette</strong>
      <span className="mx-2 text-ardoise-300" aria-hidden="true">
        ·
      </span>
      <span className="text-ardoise-100">
        Site non indexé. Certaines informations restent à confirmer par le cabinet.
      </span>
    </div>
  );
}
