"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { CABINET } from "@/config/cabinet";
import { OBJETS_DEMANDE, CANAUX_RAPPEL, schemaContact } from "@/lib/validation";

type Etat =
  | { type: "repos" }
  | { type: "envoi" }
  | { type: "succes" }
  | { type: "echec"; message: string };

export function FormulaireContact() {
  const [etat, setEtat] = useState<Etat>({ type: "repos" });
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const affiche = useRef<number | null>(null);
  const idFormulaire = useId();
  const telephone = CABINET.telephone.valeur;

  // Horodatage d'affichage du formulaire : un envoi quasi instantané trahit un
  // robot. Relevé après le premier rendu, pour ne pas dépendre de l'heure
  // pendant le rendu lui-même.
  useEffect(() => {
    affiche.current = Date.now();
  }, []);

  const champId = (nom: string) => `${idFormulaire}-${nom}`;
  const erreurId = (nom: string) => `${idFormulaire}-${nom}-erreur`;

  async function soumettre(evenement: React.FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    const formulaire = evenement.currentTarget;
    const donneesBrutes = Object.fromEntries(new FormData(formulaire));

    const donnees = {
      ...donneesBrutes,
      consentement: donneesBrutes.consentement === "on",
      affichéÀ: affiche.current ?? undefined,
    };

    // Validation côté client : retour immédiat, sans aller-retour réseau.
    // Le contrôle qui fait foi reste celui du serveur.
    const analyse = schemaContact.safeParse(donnees);
    if (!analyse.success) {
      const messages: Record<string, string> = {};
      for (const probleme of analyse.error.issues) {
        const champ = String(probleme.path[0]);
        if (!messages[champ]) messages[champ] = probleme.message;
      }
      setErreurs(messages);
      setEtat({ type: "repos" });

      // Le focus part sur le premier champ en erreur.
      const premier = Object.keys(messages)[0];
      if (premier) document.getElementById(champId(premier))?.focus();
      return;
    }

    setErreurs({});
    setEtat({ type: "envoi" });

    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analyse.data),
      });

      const resultat: { message?: string } = await reponse.json().catch(() => ({}));

      if (!reponse.ok) {
        // Aucun faux succès : l'échec est annoncé tel quel, avec une voie de repli.
        setEtat({
          type: "echec",
          message:
            resultat.message ??
            "Votre message n'a pas pu être envoyé. Merci de réessayer ou de nous appeler.",
        });
        return;
      }

      setEtat({ type: "succes" });
      formulaire.reset();
    } catch {
      setEtat({
        type: "echec",
        message:
          "Votre message n'a pas pu être envoyé — la connexion a échoué. Merci de réessayer ou de nous appeler.",
      });
    }
  }

  if (etat.type === "succes") {
    return (
      <div
        role="status"
        className="rounded-carte border border-succes/30 bg-succes/5 p-6"
      >
        <h2 className="font-titre text-xl text-encre">Votre message est parti</h2>
        <p className="mt-3 text-ardoise-700">
          Nous en accusons réception par e-mail. Un membre du cabinet vous
          recontacte par le canal que vous avez indiqué.
        </p>
        <p className="mt-3 text-ardoise-700">
          Si votre demande est urgente, vous pouvez nous appeler au{" "}
          <a
            href={`tel:${telephone.lien}`}
            className="font-medium text-laiton underline underline-offset-2"
          >
            {telephone.affichage}
          </a>
          .
        </p>
      </div>
    );
  }

  const enCours = etat.type === "envoi";

  return (
    <form onSubmit={soumettre} noValidate className="space-y-6">
      {etat.type === "echec" && (
        <div
          role="alert"
          className="rounded-carte border border-erreur/30 bg-erreur/5 p-4 text-sm text-erreur"
        >
          <p className="font-medium">{etat.message}</p>
          <p className="mt-2 text-ardoise-700">
            Vous pouvez nous joindre directement au{" "}
            <a href={`tel:${telephone.lien}`} className="underline underline-offset-2">
              {telephone.affichage}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Champ
          nom="nom"
          libelle="Nom et prénom"
          requis
          autoComplete="name"
          erreur={erreurs.nom}
          champId={champId}
          erreurId={erreurId}
        />
        <Champ
          nom="entreprise"
          libelle="Entreprise"
          indication="Facultatif"
          autoComplete="organization"
          erreur={erreurs.entreprise}
          champId={champId}
          erreurId={erreurId}
        />
        <Champ
          nom="email"
          libelle="Adresse e-mail"
          type="email"
          requis
          autoComplete="email"
          erreur={erreurs.email}
          champId={champId}
          erreurId={erreurId}
        />
        <Champ
          nom="telephone"
          libelle="Téléphone"
          type="tel"
          indication="Facultatif — utile si vous préférez être rappelé"
          autoComplete="tel"
          erreur={erreurs.telephone}
          champId={champId}
          erreurId={erreurId}
        />
      </div>

      <div>
        <label htmlFor={champId("objet")} className={styleLibelle}>
          Objet de votre demande <Requis />
        </label>
        <select
          id={champId("objet")}
          name="objet"
          required
          defaultValue=""
          aria-invalid={erreurs.objet ? true : undefined}
          aria-describedby={erreurs.objet ? erreurId("objet") : undefined}
          className={styleChamp(Boolean(erreurs.objet))}
        >
          <option value="" disabled>
            Choisissez un objet
          </option>
          {OBJETS_DEMANDE.map((objet) => (
            <option key={objet} value={objet}>
              {objet}
            </option>
          ))}
        </select>
        <MessageErreur id={erreurId("objet")} message={erreurs.objet} />
      </div>

      <div>
        <label htmlFor={champId("message")} className={styleLibelle}>
          Votre message <Requis />
        </label>
        <p className="mb-2 text-sm text-ardoise-500">
          Décrivez votre activité et votre besoin en quelques lignes.
        </p>
        <textarea
          id={champId("message")}
          name="message"
          rows={6}
          required
          aria-invalid={erreurs.message ? true : undefined}
          aria-describedby={erreurs.message ? erreurId("message") : undefined}
          className={styleChamp(Boolean(erreurs.message))}
        />
        <MessageErreur id={erreurId("message")} message={erreurs.message} />
      </div>

      <fieldset>
        <legend className={styleLibelle}>
          Comment préférez-vous être recontacté ? <Requis />
        </legend>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
          {CANAUX_RAPPEL.map((canal) => (
            <label key={canal} className="flex items-center gap-2 text-ardoise-900">
              <input
                type="radio"
                name="canalRappel"
                value={canal}
                className="size-4 accent-[var(--color-laiton)]"
              />
              {canal}
            </label>
          ))}
        </div>
        <MessageErreur id={erreurId("canalRappel")} message={erreurs.canalRappel} />
      </fieldset>

      {/* Avertissement de confidentialité — exigence du cadrage. */}
      <div className="rounded-carte border border-bordure bg-craie-ombre p-4 text-sm text-ardoise-700">
        <p>
          <strong className="font-semibold text-encre">
            Merci de ne transmettre par ce formulaire aucune donnée
            confidentielle
          </strong>{" "}
          — ni pièce comptable, ni bulletin de paie, ni document d&apos;identité,
          ni coordonnées bancaires. Les échanges de documents se font par
          l&apos;espace client sécurisé, dont l&apos;accès vous est communiqué au
          début de la mission.
        </p>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-ardoise-700">
          <input
            type="checkbox"
            name="consentement"
            className="mt-1 size-4 shrink-0 accent-[var(--color-laiton)]"
            aria-invalid={erreurs.consentement ? true : undefined}
            aria-describedby={
              erreurs.consentement ? erreurId("consentement") : undefined
            }
          />
          <span>
            J&apos;accepte que les informations transmises soient utilisées pour
            traiter ma demande et me recontacter. Elles sont destinées au seul
            cabinet {CABINET.nom} et ne sont ni cédées, ni utilisées à des fins
            publicitaires.{" "}
            <Link
              href="/politique-confidentialite"
              className="text-laiton underline underline-offset-2"
            >
              En savoir plus sur vos droits
            </Link>
            .
          </span>
        </label>
        <MessageErreur id={erreurId("consentement")} message={erreurs.consentement} />
      </div>

      {/*
        Champ leurre : invisible, hors du parcours clavier, non annoncé par les
        lecteurs d'écran. Un robot le remplit, un humain jamais.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={champId("siteWeb")}>Ne pas remplir ce champ</label>
        <input
          id={champId("siteWeb")}
          type="text"
          name="siteWeb"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded-douce bg-encre px-6 py-3.5 font-medium text-white transition-colors hover:bg-ardoise-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {enCours ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}

// ── Sous-composants ──────────────────────────────────────────────────────

const styleLibelle = "block font-medium text-encre";

function styleChamp(enErreur: boolean): string {
  return `mt-2 w-full rounded-douce border bg-white px-3.5 py-2.5 text-encre outline-none transition-colors ${
    enErreur
      ? "border-erreur"
      : "border-bordure focus:border-laiton"
  }`;
}

function Requis() {
  return (
    <span className="text-erreur" aria-hidden="true">
      *
    </span>
  );
}

function MessageErreur({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-erreur">
      {message}
    </p>
  );
}

function Champ({
  nom,
  libelle,
  type = "text",
  requis = false,
  indication,
  autoComplete,
  erreur,
  champId,
  erreurId,
}: {
  nom: string;
  libelle: string;
  type?: string;
  requis?: boolean;
  indication?: string;
  autoComplete?: string;
  erreur?: string;
  champId: (nom: string) => string;
  erreurId: (nom: string) => string;
}) {
  const idIndication = `${champId(nom)}-indication`;

  return (
    <div>
      <label htmlFor={champId(nom)} className={styleLibelle}>
        {libelle} {requis && <Requis />}
      </label>
      {indication && (
        <p id={idIndication} className="mt-1 text-sm text-ardoise-500">
          {indication}
        </p>
      )}
      <input
        id={champId(nom)}
        name={nom}
        type={type}
        required={requis}
        autoComplete={autoComplete}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={
          [erreur ? erreurId(nom) : null, indication ? idIndication : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={styleChamp(Boolean(erreur))}
      />
      <MessageErreur id={erreurId(nom)} message={erreur} />
    </div>
  );
}
