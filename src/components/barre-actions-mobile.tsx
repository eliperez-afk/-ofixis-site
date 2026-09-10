import Link from "next/link";
import { CABINET } from "@/config/cabinet";

/**
 * Barre d'actions fixe en bas de l'écran sur mobile.
 *
 * Trois actions seulement. Le décalage du contenu est géré par le
 * `padding-bottom` du `body` (voir globals.css) : la barre ne masque donc
 * jamais la fin de page. Les zones sûres iOS sont respectées.
 */
export function BarreActionsMobile() {
  const telephone = CABINET.telephone.valeur;

  return (
    <nav
      aria-label="Actions rapides"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-bordure bg-craie/98 backdrop-blur-sm md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-3">
        <li>
          <a
            href={`tel:${telephone.lien}`}
            className="flex h-16 flex-col items-center justify-center gap-1 text-xs text-ardoise-900"
          >
            <IconeTelephone />
            <span>Appeler</span>
          </a>
        </li>
        <li className="border-x border-bordure">
          <Link
            href="/prendre-rendez-vous"
            className="flex h-16 flex-col items-center justify-center gap-1 text-xs text-ardoise-900"
          >
            <IconeAgenda />
            <span>Rendez-vous</span>
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="flex h-16 flex-col items-center justify-center gap-1 text-xs text-ardoise-900"
          >
            <IconeMessage />
            <span>Message</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const proprietesIcone = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function IconeTelephone() {
  return (
    <svg {...proprietesIcone}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function IconeAgenda() {
  return (
    <svg {...proprietesIcone}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconeMessage() {
  return (
    <svg {...proprietesIcone}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}
