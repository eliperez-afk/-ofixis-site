"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CABINET } from "@/config/cabinet";
import { navigationPrincipale, lienEspaceClient } from "@/config/navigation";
import { Conteneur } from "./conteneur";

/**
 * En-tête du site.
 *
 * Compact, sans effet d'apparition. Le menu mobile est un simple panneau
 * dépliant : pas de superposition plein écran qui piège le focus.
 */
export function SiteHeader() {
  const [ouvert, setOuvert] = useState(false);
  const chemin = usePathname();
  const liens = navigationPrincipale();
  const espaceClient = lienEspaceClient();

  const estActif = (href: string) =>
    href === "/" ? chemin === "/" : chemin.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-bordure bg-craie/95 backdrop-blur-sm">
      <Conteneur taille="large">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-titre text-xl tracking-tight text-encre"
            aria-label={`${CABINET.nom} — accueil`}
          >
            {CABINET.nom}
          </Link>

          {/* Navigation ordinateur */}
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-7 text-[0.95rem]">
              {liens.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    aria-current={estActif(lien.href) ? "page" : undefined}
                    className={`py-2 transition-colors hover:text-laiton ${
                      estActif(lien.href)
                        ? "text-laiton"
                        : "text-ardoise-700"
                    }`}
                  >
                    {lien.libelle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {espaceClient && (
              <a
                href={espaceClient}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-douce border border-bordure px-3.5 py-2 text-sm text-ardoise-700 transition-colors hover:border-laiton hover:text-laiton"
              >
                Espace client
                <span className="sr-only"> (nouvelle fenêtre)</span>
              </a>
            )}
            <Link
              href="/prendre-rendez-vous"
              className="rounded-douce bg-encre px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ardoise-900"
            >
              Prendre rendez-vous
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <button
            type="button"
            onClick={() => setOuvert((o) => !o)}
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            className="rounded-douce border border-bordure px-3 py-2 text-sm lg:hidden"
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </Conteneur>

      {/* Navigation mobile */}
      <div id="menu-mobile" hidden={!ouvert} className="border-t border-bordure lg:hidden">
        <Conteneur taille="large">
          <nav aria-label="Navigation principale (mobile)" className="py-4">
            <ul className="flex flex-col gap-1">
              {liens.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    onClick={() => setOuvert(false)}
                    aria-current={estActif(lien.href) ? "page" : undefined}
                    className="block rounded-douce px-2 py-2.5 text-ardoise-900 hover:bg-craie-ombre"
                  >
                    {lien.libelle}
                  </Link>
                  {lien.enfants && (
                    <ul className="mb-2 ml-3 border-l border-bordure pl-3">
                      {lien.enfants.map((enfant) => (
                        <li key={enfant.href}>
                          <Link
                            href={enfant.href}
                            onClick={() => setOuvert(false)}
                            className="block py-1.5 text-sm text-ardoise-500 hover:text-laiton"
                          >
                            {enfant.libelle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {espaceClient && (
                <li>
                  <a
                    href={espaceClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-douce px-2 py-2.5 text-ardoise-900 hover:bg-craie-ombre"
                  >
                    Espace client
                    <span className="sr-only"> (nouvelle fenêtre)</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </Conteneur>
      </div>
    </header>
  );
}
