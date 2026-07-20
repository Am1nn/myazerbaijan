import { ImageResponse } from "next/og";

export const alt = "MyAzerbaijan — Azərbaycanın tarixi irsi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #101b36 0%, #264477 55%, #8ea9d2 100%)", color: "white", padding: "76px", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", width: 520, height: 520, border: "2px solid rgba(255,255,255,.15)", borderRadius: "50%", right: -80, top: -190 }} />
      <div style={{ position: "absolute", width: 360, height: 360, border: "2px solid rgba(255,255,255,.12)", borderRadius: "50%", right: 120, bottom: -210 }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 27, fontWeight: 700 }}>
          <div style={{ width: 54, height: 54, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 18, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.28)" }}>AZ</div>
          MyAzerbaijan
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: -3, fontWeight: 800 }}>Azərbaycanı kəşf et</div>
          <div style={{ marginTop: 24, fontSize: 30, lineHeight: 1.4, color: "rgba(255,255,255,.82)" }}>Tarixi məkanlar, mədəni irs və interaktiv səyahət xəritəsi</div>
        </div>
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 5, color: "rgba(255,255,255,.65)" }}>KƏŞF · PLAN · SƏYAHƏT</div>
      </div>
    </div>,
    size,
  );
}
