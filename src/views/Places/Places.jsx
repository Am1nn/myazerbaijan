"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Menu, Moon, Search, Sun, X } from "lucide-react";
import Link from "next/link";
import { places } from "../../data/places";
import { getPlaceImage } from "../../data/placeMedia";
import logo from "../../assets/icons/logo.svg";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import SiteRail from "../../components/SiteRail/SiteRail";
import { usePreferences } from "../../context/usePreferences";
import "./Places.css";
import "./PlacesRail.css";

const copy = {
  az: { eyebrow: "Azərbaycanın mədəni irsi", title: "Azərbaycanı tarixi abidələri ilə kəşf et", intro: "Qədim qalalardan saraylara, məbədlərdən qayaüstü rəsmlərə — ölkənin zəngin keçmişini yaxından tanı.", search: "Abidə, şəhər və ya tarixi dövr axtar", count: "tarixi məkan", explore: "Abidə haqqında öyrən" },
  tr: { eyebrow: "Azerbaycan'ın kültürel mirası", title: "Azerbaycan'ı tarihî yapılarıyla keşfet", intro: "Kadim kalelerden saraylara, tapınaklardan kaya resimlerine uzanan zengin geçmişi yakından tanıyın.", search: "Yapı, şehir veya tarihî dönem ara", count: "tarihî mekân", explore: "Yapıyı yakından tanı" },
  en: { eyebrow: "Azerbaijan's cultural heritage", title: "Discover Azerbaijan through its historic landmarks", intro: "Explore a rich past shaped by ancient fortresses, palaces, temples and prehistoric rock art.", search: "Search landmark, city or historic period", count: "historic places", explore: "Discover its history" },
  ru: { eyebrow: "Культурное наследие Азербайджана", title: "Откройте Азербайджан через его памятники", intro: "Познакомьтесь с богатым прошлым страны — от древних крепостей и дворцов до храмов и наскальных рисунков.", search: "Поиск памятника, города или эпохи", count: "исторических мест", explore: "Узнать историю места" },
};

export default function Places() {
  const { lang, setLang, theme, setTheme } = usePreferences();
  const [query, setQuery] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const contentLang = lang;
  const t = copy[lang];
  const visiblePlaces = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return places;
    return places.filter((place) =>
      [...Object.values(place.name), ...Object.values(place.city), ...Object.values(place.period)]
        .join(" ")
        .toLocaleLowerCase()
        .includes(term)
    );
  }, [query]);

  return (
    <main className={`places-index theme-${theme}`}>
      <SiteRail mobileOpen={mobileNav} />
      <div className="places-index-main">
      <header className="index-nav">
        <Link href="/" className="index-brand"><img className="site-logo" src={logo.src} alt="" /><strong>MyAzerbaijan</strong></Link>
        <div className="index-tools"><LanguageSelector value={lang} onChange={setLang} /><button onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Theme">{theme === "light" ? <Moon /> : <Sun />}</button><button className="index-menu" onClick={() => setMobileNav((value) => !value)} aria-label="Menu">{mobileNav ? <X /> : <Menu />}</button></div>
      </header>
      <section className="index-hero">
        <span>{t.eyebrow}</span><h1>{t.title}</h1><p>{t.intro}</p>
        <label className="index-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} /></label>
      </section>
      <div className="catalog-heading"><h2>{visiblePlaces.length} {t.count}</h2><span>MyAzerbaijan Selection</span></div>
      <section className="modern-place-grid">
        {visiblePlaces.map((place, index) => (
          <Link className="modern-place-card" href={`/places/${place.slug}`} key={place.id}>
            <div className="card-photo"><img src={getPlaceImage(place.id)} alt={place.name[contentLang]} loading={index < 2 ? "eager" : "lazy"} decoding="async" fetchPriority={index === 0 ? "high" : "auto"} /><span>0{index + 1}</span><i>{place.period[contentLang]}</i></div>
            <div className="card-body"><small><MapPin />{place.city[contentLang]}</small><h2>{place.name[contentLang]}</h2><p>{place.shortDescription[contentLang]}</p><b>{t.explore}<ArrowUpRight /></b></div>
          </Link>
        ))}
      </section>
      </div>
    </main>
  );
}
