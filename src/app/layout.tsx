import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CABINET, URL_SITE, EST_PRODUCTION } from "@/config/cabinet";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BarreActionsMobile } from "@/components/barre-actions-mobile";
import { BandeauPreproduction } from "@/components/bandeau-preproduction";
import { DonneesStructurees } from "@/components/donnees-structurees";
import { jsonLdOrganisation, jsonLdSiteWeb } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: {
    default: `${CABINET.nom} — ${CABINET.activite}`,
    template: `%s — ${CABINET.nom}`,
  },
  description:
    "Cabinet d'expertise comptable et de commissariat aux comptes à Levallois-Perret. Comptabilité, fiscalité, paie et audit pour les TPE, PME et professions libérales.",
  applicationName: CABINET.nom,
  robots: EST_PRODUCTION
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0c1f2c",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <a href="#contenu" className="lien-evitement">
          Aller au contenu principal
        </a>

        <BandeauPreproduction />
        <SiteHeader />

        <main id="contenu">{children}</main>

        <SiteFooter />
        <BarreActionsMobile />

        <DonneesStructurees donnees={jsonLdOrganisation()} />
        <DonneesStructurees donnees={jsonLdSiteWeb()} />

        {/*
          Mesure d'audience sans cookie : le script n'est chargé que si le
          domaine est configuré. Aucun traceur n'est déposé par défaut, ce qui
          rend le bandeau de consentement inutile.
        */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAINE && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAINE}
            src="https://plausible.io/js/script.outbound-links.js"
          />
        )}
      </body>
    </html>
  );
}
