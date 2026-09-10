import Link from "next/link";
import { DonneesStructurees } from "./donnees-structurees";
import { jsonLdFilAriane } from "@/lib/jsonld";

export type ElementAriane = { libelle: string; href: string };

/** Fil d'Ariane visible, doublé du balisage BreadcrumbList. */
export function FilAriane({ elements }: { elements: ElementAriane[] }) {
  const complet: ElementAriane[] = [{ libelle: "Accueil", href: "/" }, ...elements];

  return (
    <>
      <nav aria-label="Fil d'Ariane" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ardoise-500">
          {complet.map((element, index) => {
            const dernier = index === complet.length - 1;
            return (
              <li key={element.href} className="flex items-center gap-2">
                {dernier ? (
                  <span aria-current="page" className="text-ardoise-700">
                    {element.libelle}
                  </span>
                ) : (
                  <Link href={element.href} className="hover:text-laiton hover:underline">
                    {element.libelle}
                  </Link>
                )}
                {!dernier && (
                  <span aria-hidden="true" className="text-ardoise-300">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <DonneesStructurees donnees={jsonLdFilAriane(complet)} />
    </>
  );
}
