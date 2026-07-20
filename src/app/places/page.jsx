import Places from "../../views/Places/Places";

export const metadata = {
  title: "Tarixi məkanlar",
  description: "Azərbaycanın seçilmiş tarixi məkanlarını, memarlıq abidələrini və mədəni irs nümunələrini kəşf edin.",
  alternates: { canonical: "/places" },
};

export default function Page() {
  return <Places />;
}
