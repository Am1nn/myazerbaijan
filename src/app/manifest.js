export default function manifest() {
  return {
    name: "MyAzerbaijan — Azərbaycanın rəqəmsal səyahət atlası",
    short_name: "MyAzerbaijan",
    description: "Azərbaycanın tarixi məkanlarını və mədəni irsini kəşf edin.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7fb",
    theme_color: "#1d2e57",
    lang: "az",
    icons: [{ src: "/favicon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
