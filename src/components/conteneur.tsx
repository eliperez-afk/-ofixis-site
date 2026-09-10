import type { ReactNode } from "react";

/**
 * Conteneur horizontal unique du site.
 * Les marges latérales sont définies ici et nulle part ailleurs, ce qui garantit
 * une gouttière d'au moins 20 px à toutes les largeurs et évite tout
 * défilement horizontal.
 */
export function Conteneur({
  children,
  taille = "normale",
  className = "",
}: {
  children: ReactNode;
  taille?: "normale" | "etroite" | "large";
  className?: string;
}) {
  const largeurs = {
    etroite: "max-w-3xl",
    normale: "max-w-5xl",
    large: "max-w-6xl",
  };

  return (
    <div className={`mx-auto w-full px-5 sm:px-6 ${largeurs[taille]} ${className}`}>
      {children}
    </div>
  );
}

/** Section verticale avec un rythme d'espacement homogène. */
export function Section({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`py-14 sm:py-20 ${className}`} {...props}>
      {children}
    </section>
  );
}

/** Sur-titre discret placé au-dessus d'un titre de section. */
export function Surtitre({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-laiton">
      {children}
    </p>
  );
}
