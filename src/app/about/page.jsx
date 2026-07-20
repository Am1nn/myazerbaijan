import About from "../../views/About/About";

export const metadata = {
  title: "Haqqımızda",
  description: "Azərbaycanın tarixi və mədəni irsini rəqəmsal xəritədə təqdim edən MyAzerbaijan layihəsi haqqında məlumat.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <About />;
}
