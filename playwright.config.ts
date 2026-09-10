import { defineConfig, devices } from "@playwright/test";

const PORT = 3210;

/**
 * Chromium fourni par l'environnement d'exécution. Le renseigner évite que
 * Playwright tente de télécharger un navigateur, ce que la politique réseau
 * interdit ici. Sur un poste de développement classique, laisser la variable
 * vide suffit : Playwright utilise alors son navigateur installé.
 */
const cheminChromium = process.env.CHEMIN_CHROMIUM;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "on-first-retry",
    locale: "fr-FR",
    timezoneId: "Europe/Paris",
  },
  projects: [
    {
      name: "ordinateur",
      use: {
        ...devices["Desktop Chrome"],
        ...(cheminChromium
          ? { launchOptions: { executablePath: cheminChromium } }
          : {}),
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["Pixel 7"],
        ...(cheminChromium
          ? { launchOptions: { executablePath: cheminChromium } }
          : {}),
      },
    },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    // La limitation de débit du formulaire est relevée pour permettre aux
    // tests de rejouer le parcours d'envoi ; elle reste active.
    env: { CONTACT_MAX_ENVOIS: "500" },
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
