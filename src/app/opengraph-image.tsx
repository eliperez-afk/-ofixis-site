import { ImageResponse } from "next/og";
import { CABINET, adresseUneLigne } from "@/config/cabinet";

/** Image de partage sur les réseaux sociaux, générée au build. */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${CABINET.nom} — ${CABINET.activite}`;

export default function ImageOpenGraph() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c1f2c",
          padding: "72px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 64, letterSpacing: -1 }}>
          {CABINET.nom}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 44, lineHeight: 1.2, maxWidth: 900 }}>
            {CABINET.activite}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#d6a45c" }}>
            {adresseUneLigne()}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
