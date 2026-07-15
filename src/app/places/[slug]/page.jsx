import { notFound } from "next/navigation";
import PlaceDetail from "../../../views/PlaceDetail/PlaceDetail";
import { places } from "../../../data/places";

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!places.some((place) => place.slug === slug)) notFound();
  return <PlaceDetail slug={slug} />;
}
