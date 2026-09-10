import type { NextConfig } from "next";
import { redirectionsHeritees } from "./src/config/redirections";

/**
 * En-têtes de sécurité appliqués à toutes les réponses.
 * HSTS n'est activé qu'en production, après validation du domaine :
 * l'activer trop tôt rendrait le domaine inaccessible en cas d'erreur de certificat.
 */
const enTetesSecurite = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const estProduction = process.env.NEXT_PUBLIC_ENVIRONNEMENT === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const enTetes = [...enTetesSecurite];

    if (estProduction) {
      enTetes.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    } else {
      // Préproduction : interdiction d'indexation au niveau du serveur,
      // en complément de robots.txt.
      enTetes.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    }

    return [{ source: "/:chemin*", headers: enTetes }];
  },
  async redirects() {
    return redirectionsHeritees;
  },
};

export default nextConfig;
