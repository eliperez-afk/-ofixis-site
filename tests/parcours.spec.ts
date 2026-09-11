import { test, expect } from "@playwright/test";

/**
 * Tests des parcours qui portent la conversion : appeler, écrire, prendre
 * rendez-vous, naviguer sur mobile. Chaque test vérifie un comportement dont
 * la régression coûterait une demande entrante.
 */

test.describe("Parcours d'accueil", () => {
  test("le premier écran annonce l'activité, la ville et les actions", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: /expert-comptable/i }),
    ).toBeVisible();
    await expect(page.getByText("Levallois-Perret").first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Prendre rendez-vous/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Appeler le/i }).first(),
    ).toBeVisible();
  });

  test("aucun défilement horizontal à 320 px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");

    const debordement = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(debordement).toBe(false);
  });

  test("le numéro de téléphone est un lien tel: exploitable", async ({ page }) => {
    await page.goto("/");
    const lien = page.locator('a[href^="tel:"]').first();
    await expect(lien).toHaveAttribute("href", "tel:+33650281286");
  });
});

test.describe("Navigation", () => {
  test("le lien d'évitement mène au contenu principal", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const evitement = page.getByRole("link", {
      name: "Aller au contenu principal",
    });
    await expect(evitement).toBeFocused();
    await expect(evitement).toBeVisible();
  });

  test("on atteint une page mission depuis l'accueil", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Expertise comptable" }).first().click();

    await expect(page).toHaveURL(/\/missions\/expertise-comptable$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Expertise comptable" }),
    ).toBeVisible();
  });

  test("le fil d'Ariane ramène à la rubrique", async ({ page }) => {
    await page.goto("/missions/fiscalite");
    await page
      .getByRole("navigation", { name: "Fil d'Ariane" })
      .getByRole("link", { name: "Missions" })
      .click();
    await expect(page).toHaveURL(/\/missions$/);
  });
});

test.describe("Formulaire de contact", () => {
  test("les erreurs sont explicites et le focus part sur le premier champ fautif", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Envoyer ma demande/i }).click();

    await expect(page.getByText("Merci d'indiquer votre nom.")).toBeVisible();
    await expect(page.getByLabel(/Nom et prénom/)).toBeFocused();
  });

  test("un échec d'envoi n'est jamais présenté comme un succès", async ({
    page,
  }) => {
    // Le service d'e-mail n'étant pas configuré en recette, l'API répond 502.
    await page.goto("/contact");

    await page.getByLabel(/Nom et prénom/).fill("Camille Durand");
    await page.getByLabel(/Adresse e-mail/).fill("camille.durand@example.fr");
    await page.getByLabel(/Objet de votre demande/).selectOption("Premier rendez-vous");
    await page
      .getByLabel(/Votre message/)
      .fill("Bonjour, je souhaite un premier rendez-vous pour ma société.");
    await page.getByRole("radio", { name: "Téléphone" }).check();
    await page.getByRole("checkbox").check();

    // Le contrôle anti-robot écarte les envois de moins de trois secondes.
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: /Envoyer ma demande/i }).click();

    // On cible l'alerte du formulaire : Next place aussi un « route announcer »
    // portant le rôle alert dans la page.
    const alerte = page.locator('form [role="alert"]');
    await expect(alerte).toBeVisible();
    await expect(alerte).toContainText(/n'a pas pu être envoyé/i);
    await expect(page.getByText(/Votre message est parti/)).toHaveCount(0);
  });

  test("l'avertissement sur les données confidentielles est présent", async ({
    page,
  }) => {
    await page.goto("/contact");
    await expect(
      page.getByText(/ne transmettre par ce formulaire aucune donnée/i),
    ).toBeVisible();
  });
});

test.describe("Espace client", () => {
  test("le lien pointe vers le portail réel, en sécurité", async ({ page }) => {
    await page.goto("/");
    const lien = page.locator('a[href="https://apps.tiime.fr/signin"]').first();

    await expect(lien).toHaveAttribute("target", "_blank");
    // rel="noopener noreferrer" empêche la page ouverte d'agir sur la nôtre.
    await expect(lien).toHaveAttribute("rel", /noopener/);
    await expect(lien).toHaveAttribute("rel", /noreferrer/);
  });

  test("aucune authentification n'est simulée sur le site", async ({ page }) => {
    // Le site ne doit comporter aucun champ de mot de passe : la connexion
    // se fait exclusivement sur le portail du prestataire.
    for (const chemin of ["/", "/contact", "/cabinet"]) {
      await page.goto(chemin);
      await expect(page.locator('input[type="password"]')).toHaveCount(0);
    }
  });
});

test.describe("Horaires", () => {
  test("les horaires sont affichés et correctement balisés", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Du lundi au vendredi").first()).toBeVisible();
    await expect(page.getByText("8h30 – 19h30").first()).toBeVisible();

    const balisage = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    const donnees = JSON.parse(balisage ?? "{}");

    expect(donnees.openingHoursSpecification?.[0]).toMatchObject({
      opens: "08:30",
      closes: "19:30",
    });
    expect(donnees.openingHoursSpecification[0].dayOfWeek).toContain("Monday");
    expect(donnees.openingHoursSpecification[0].dayOfWeek).not.toContain(
      "Saturday",
    );
  });
});

test.describe("Prise de rendez-vous", () => {
  test("aucun agenda simulé tant que Bookings n'est pas configuré", async ({
    page,
  }) => {
    await page.goto("/prendre-rendez-vous");

    await expect(
      page.getByRole("heading", { level: 1, name: "Prendre rendez-vous" }),
    ).toBeVisible();
    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
  });
});

test.describe("Contenu non validé", () => {
  test("un article en brouillon n'est pas accessible", async ({ page }) => {
    const reponse = await page.goto("/actualites/exemple-modele-article");
    expect(reponse?.status()).toBe(404);
  });

  test("la page équipe n'existe pas sans consentement publié", async ({
    page,
  }) => {
    const reponse = await page.goto("/equipe");
    expect(reponse?.status()).toBe(404);
  });

  test("aucun logo ni nom de client n'est affiché", async ({ page }) => {
    await page.goto("/");
    const contenu = (await page.textContent("body")) ?? "";
    for (const marque of ["Allianz", "Axa", "Krys", "Orangetheory"]) {
      expect(contenu).not.toContain(marque);
    }
  });

  test("aucune adresse de l'ancien site ne subsiste", async ({ page }) => {
    for (const chemin of ["/", "/cabinet", "/contact", "/mentions-legales"]) {
      await page.goto(chemin);
      const contenu = (await page.textContent("body")) ?? "";
      for (const ancienne of [
        "Noisy-le-Sec",
        "rue Bosio",
        "Provins",
        "Courloison",
        "Saint-Mandé",
      ]) {
        expect(contenu, `${ancienne} trouvé sur ${chemin}`).not.toContain(
          ancienne,
        );
      }
      expect(contenu).not.toContain("01 89 41 04 76");
    }
  });
});

test.describe("Barre d'actions mobile", () => {
  test("les trois actions sont présentes et ne masquent pas le pied de page", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Barre affichée uniquement sur mobile.");

    await page.goto("/");
    const barre = page.getByRole("navigation", { name: "Actions rapides" });

    await expect(barre.getByRole("link", { name: "Appeler" })).toBeVisible();
    await expect(barre.getByRole("link", { name: "Rendez-vous" })).toBeVisible();
    await expect(barre.getByRole("link", { name: "Message" })).toBeVisible();

    // Le dernier contenu du pied de page doit rester atteignable.
    await page.keyboard.press("End");
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
});

test.describe("SEO technique", () => {
  test("chaque page a un titre, une description et une canonique uniques", async ({
    page,
  }) => {
    const chemins = ["/", "/cabinet", "/missions", "/missions/fiscalite", "/contact"];
    const titres = new Set<string>();
    const canoniques = new Set<string>();

    for (const chemin of chemins) {
      await page.goto(chemin);

      const titre = await page.title();
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      const canonique = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");

      expect(titre.length).toBeGreaterThan(10);
      expect(description?.length ?? 0).toBeGreaterThan(50);
      expect(canonique).toBeTruthy();

      titres.add(titre);
      canoniques.add(canonique!);
    }

    expect(titres.size).toBe(chemins.length);
    expect(canoniques.size).toBe(chemins.length);
  });

  test("la recette est interdite d'indexation", async ({ page }) => {
    const reponse = await page.goto("/");
    expect(reponse?.headers()["x-robots-tag"]).toContain("noindex");

    const robots = await page.request.get("/robots.txt");
    expect(await robots.text()).toContain("Disallow: /");
  });

  test("les anciennes URLs sont redirigées de façon permanente", async ({
    request,
  }) => {
    for (const [ancienne, cible] of [
      ["/author/eli-amram", "/cabinet"],
      ["/2020/05/03/selarl-ou-centre-dentaire", "/actualites"],
      ["/category/fiscalite", "/actualites"],
      ["/nos-services", "/missions"],
    ]) {
      const reponse = await request.get(ancienne!, { maxRedirects: 0 });
      expect([301, 308]).toContain(reponse.status());
      expect(reponse.headers()["location"]).toContain(cible!);
    }
  });

  test("une page inconnue renvoie une 404 utile", async ({ page }) => {
    const reponse = await page.goto("/une-page-qui-nexiste-pas");
    expect(reponse?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: /n'existe pas/i }),
    ).toBeVisible();
  });
});

test.describe("Qualité générale", () => {
  test("aucune erreur console sur les pages principales", async ({ page }) => {
    const erreurs: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") erreurs.push(message.text());
    });
    page.on("pageerror", (erreur) => erreurs.push(erreur.message));

    for (const chemin of ["/", "/cabinet", "/missions", "/actualites", "/contact"]) {
      await page.goto(chemin);
    }

    expect(erreurs).toEqual([]);
  });

  test("toutes les images portent une alternative textuelle", async ({ page }) => {
    for (const chemin of ["/", "/cabinet", "/missions"]) {
      await page.goto(chemin);
      const sansAlt = await page.locator("img:not([alt])").count();
      expect(sansAlt, `image sans alt sur ${chemin}`).toBe(0);
    }
  });
});
