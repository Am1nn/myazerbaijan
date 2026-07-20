import { notFound } from "next/navigation";
import PlaceDetail from "../../../views/PlaceDetail/PlaceDetail";
import { places } from "../../../data/places";
import { getPlaceImage } from "../../../data/placeMedia";

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const place = places.find((item) => item.slug === slug);
  if (!place) return {};

  const title = place.name.az;
  const description = place.shortDescription.az;
  const image = getPlaceImage(place.id);
  return {
    title,
    description,
    keywords: [title, place.city.az, place.period.az, "Azərbaycan tarixi məkanları"],
    alternates: { canonical: `/places/${place.slug}` },
    openGraph: {
      type: "article",
      locale: "az_AZ",
      url: `/places/${place.slug}`,
      title: `${title} | MyAzerbaijan`,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!places.some((place) => place.slug === slug)) notFound();
  return <PlaceDetail slug={slug} />;
}
