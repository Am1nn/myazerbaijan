"use client";

import { useEffect, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, ExternalLink, MapPin, Maximize2, Menu, Moon, Navigation, Sun, X } from "lucide-react";
import Link from "next/link";
import { places } from "../../data/places";
import { getPlaceImages } from "../../data/placeMedia";
import logo from "../../assets/icons/logo.svg";
import googleMapsLogo from "../../assets/icons/google_maps.webp";
import wazeLogo from "../../assets/icons/waze.png";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import SiteRail from "../../components/SiteRail/SiteRail";
import { usePreferences } from "../../context/usePreferences";
import "./PlaceDetail.css";
import "./PlaceDetailMobile.css";
import "./PlaceDetailLightbox.css";
import "./PlaceDetailRail.css";
import "./RouteButtons.css";

const text = {
  az: { back: "Bütün məkanlar", selected: "Tarixi məkan bələdçisi", facts: "Əsas məlumatlar", story: "Məkan haqqında", route: "Ora necə getmək olar?", openWith: "Marşrutu aç", fullscreen: "Tam ekran" },
  tr: { back: "Tüm mekânlar", selected: "Tarihi mekân rehberi", facts: "Temel bilgiler", story: "Mekân hakkında", route: "Oraya nasıl gidilir?", openWith: "Rotayı aç", fullscreen: "Tam ekran" },
  en: { back: "All places", selected: "Historic place guide", facts: "Key facts", story: "About this place", route: "How to get there", openWith: "Open route in", fullscreen: "Full screen" },
  ru: { back: "Все места", selected: "Гид по историческому месту", facts: "Основные факты", story: "Об этом месте", route: "Как добраться", openWith: "Открыть маршрут", fullscreen: "На весь экран" },
};

const additionalDescription = {
  az: (placeName) => `${placeName} Azərbaycanın mədəni yaddaşını, memarlıq ənənələrini və tarixi inkişafını anlamaq üçün mühüm dayanacaqdır. Səfərdən əvvəl iş saatlarını və yerli ziyarət qaydalarını yoxlamaq tövsiyə olunur.`,
  tr: (placeName) => `${placeName}, Azerbaycan'ın kültürel belleğini, mimari geleneklerini ve tarihî gelişimini anlamak için önemli bir duraktır. Ziyaretten önce çalışma saatlerini ve yerel ziyaret kurallarını kontrol etmeniz önerilir.`,
  en: (placeName) => `${placeName} is an important stop for understanding Azerbaijan's cultural memory, architectural traditions and historic development. Check opening hours and local visitor guidance before travelling.`,
  ru: (placeName) => `${placeName} — важное место для понимания культурной памяти, архитектурных традиций и исторического развития Азербайджана. Перед поездкой рекомендуется проверить часы работы и местные правила посещения.`,
};

export default function PlaceDetail({ slug }) {
  const place = places.find((item) => item.slug === slug);
  const { lang, setLang, theme, setTheme } = usePreferences();
  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const contentLang = lang;
  const images = place ? getPlaceImages(place.id) : [];
  const t = text[lang];
  const previous = () => setActiveImage((current) => (current - 1 + images.length) % images.length);
  const next = () => setActiveImage((current) => (current + 1) % images.length);

  useEffect(() => {
    if (!lightbox) return undefined;
    const keydown = (event) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowLeft") setActiveImage((current) => (current - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") setActiveImage((current) => (current + 1) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", keydown); };
  }, [lightbox, images.length]);

  if (!place) return null;
  const coordinates = `${place.coordinates[1]},${place.coordinates[0]}`;

  return (
    <main className={`place-detail-page theme-${theme}`}>
      <SiteRail mobileOpen={mobileNav} />
      <div className="place-detail-main">
      <header className="detail-nav"><Link href="/" className="detail-brand"><img className="site-logo" src={logo.src} alt="" /><strong>MyAzerbaijan</strong></Link><div><LanguageSelector value={lang} onChange={setLang} /><button onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Theme">{theme === "light" ? <Moon /> : <Sun />}</button><button className="detail-menu" onClick={() => setMobileNav((value) => !value)} aria-label="Menu">{mobileNav ? <X /> : <Menu />}</button></div></header>
      <section className="place-title"><span>{t.selected}</span><h1>{place.name[contentLang]}</h1><div><b><MapPin />{place.city[contentLang]}</b><b>{place.period[contentLang]}</b></div></section>
      <section className="detail-layout">
        <div className="detail-media">
          <div className="detail-stage"><img src={images[activeImage]} alt={`${place.name[contentLang]} ${activeImage + 1}`} /><span><Camera />{activeImage + 1} / {images.length}</span><button className="detail-expand" onClick={() => setLightbox(true)}><Maximize2 />{t.fullscreen}</button><button className="stage-prev" onClick={previous}><ChevronLeft /></button><button className="stage-next" onClick={next}><ChevronRight /></button></div>
          <div className="detail-thumbs">{images.map((image, index) => <button className={index === activeImage ? "active" : ""} onClick={() => setActiveImage(index)} key={image}><img src={image} alt="" /></button>)}</div>
        </div>
        <article className="place-copy"><span>{t.story}</span><p className="lead">{place.description[contentLang]}</p><p>{additionalDescription[contentLang](place.name[contentLang])}</p><h2>{t.facts}</h2><ul>{place.facts[contentLang].map((fact) => <li key={fact}>{fact}</li>)}</ul>
          <div className="route-panel"><div><Navigation /><span><strong>{t.route}</strong><small>{coordinates}</small></span></div><div className="route-links"><a className="route-google" href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates}`} target="_blank" rel="noreferrer"><span className="route-logo"><img src={googleMapsLogo.src} alt="" /></span><span><small>{t.openWith}</small><strong>Google Maps</strong></span><ExternalLink /></a><a className="route-waze" href={`https://www.waze.com/ul?ll=${coordinates}&navigate=yes`} target="_blank" rel="noreferrer"><span className="route-logo"><img src={wazeLogo.src} alt="" /></span><span><small>{t.openWith}</small><strong>Waze</strong></span><ExternalLink /></a></div></div>
        </article>
      </section>
      {lightbox && <div className="detail-lightbox" role="dialog" aria-modal="true"><button className="lightbox-close" onClick={() => setLightbox(false)}><X /></button><img src={images[activeImage]} alt={`${place.name[contentLang]} ${activeImage + 1}`} /><button className="lightbox-prev" onClick={previous}><ChevronLeft /></button><button className="lightbox-next" onClick={next}><ChevronRight /></button><span>{activeImage + 1} / {images.length}</span></div>}
      </div>
    </main>
  );
}
