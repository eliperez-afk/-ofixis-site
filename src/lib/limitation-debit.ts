/**
 * Limitation de débit en mémoire pour le formulaire de contact.
 *
 * Volontairement simple : une fenêtre glissante par adresse IP, sans service
 * externe ni stockage persistant. Sur un déploiement multi-instances, le
 * compteur n'est pas partagé — c'est acceptable ici, la limitation venant
 * s'ajouter au champ leurre et au contrôle de délai, pas les remplacer.
 *
 * Aucune donnée personnelle n'est conservée : l'adresse IP est hachée et
 * l'entrée expire d'elle-même.
 */

import { createHash } from "node:crypto";

const FENETRE_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Nombre d'envois tolérés par fenêtre. Réglable par variable
 * d'environnement, ce qui permet notamment aux tests automatisés de rejouer
 * le parcours sans être bloqués. La valeur par défaut est celle de production.
 */
const MAX_ENVOIS = Number(process.env.CONTACT_MAX_ENVOIS ?? 3);

type Entree = { compte: number; expireA: number };
const compteurs = new Map<string, Entree>();

function purger(maintenant: number): void {
  for (const [cle, entree] of compteurs) {
    if (entree.expireA <= maintenant) compteurs.delete(cle);
  }
}

export function limiteAtteinte(identifiant: string): boolean {
  const maintenant = Date.now();
  purger(maintenant);

  const cle = createHash("sha256").update(identifiant).digest("hex");
  const entree = compteurs.get(cle);

  if (!entree || entree.expireA <= maintenant) {
    compteurs.set(cle, { compte: 1, expireA: maintenant + FENETRE_MS });
    return false;
  }

  entree.compte += 1;
  return entree.compte > MAX_ENVOIS;
}
