"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Globe2,
  Home as HomeIcon,
  Images,
  Info,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  Minimize2,
  Moon,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { places } from "../../data/places";
import { getPlaceImage } from "../../data/placeMedia";
import logo from "../../assets/icons/logo.svg";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import { usePreferences } from "../../context/usePreferences";
import "./Home.css";

const Map = dynamic(() => import("../../map/Map"), { ssr: false });

const copy = {
  az: {
    discover: "Kəşf et",
    map: "Xəritə",
    about: "Haqqımızda",
    search: "Məkan, şəhər və ya dövr axtar...",
    bannerTitle: "Azərbaycanın tarixi irsini yaxından tanı",
    bannerText: "Qalaları, sarayları və qədim abidələri xəritədə kəşf et, öz mədəni marşrutunu qur.",
    explore: "Kəşfə başla",
    greeting: "Bu gün hara gedirik?",
    assistant: "Səyahətini planlamağa kömək edəcəyəm. İstədiyin hər şeyi soruş.",
    forYou: "Sənin üçün",
    exploreMore: "Daha çox kəşf et",
    places: "Məkanlar",
    recommendations: "Tövsiyələr",
    images: "Şəkillər",
    sources: "Mənbələr",
    ask: "Məndən soruş...",
    selectForAi: "Azərbaycanın tarixi məkanları haqqında soruş...", aiGreeting: "Salam! Azərbaycanın tarixi məkanları haqqında mənə sual verə bilərsiniz. Xəritədə məkan seçsəniz, yalnız həmin məkan üzrə cavab verəcəyəm.", aiRefusal: "Yalnız Azərbaycanın layihədə olan tarixi məkanları haqqında cavab verə bilərəm.", aiError: "Cavab alınmadı. Zəhmət olmasa yenidən cəhd edin.", thinking: "Cavab hazırlanır...",
    routeShortcut: "Marşrut seçimlərinə bax",
    selected: "Seçilmiş məkan",
    details: "Ətraflı məlumat",
    close: "Bağla",
  },
  en: {
    discover: "Discover",
    map: "Map",
    about: "About",
    search: "Search a place, city or period...",
    bannerTitle: "Step into Azerbaijan's historic heritage",
    bannerText: "Find fortresses, palaces and ancient landmarks on the map, then build your own cultural route.",
    explore: "Start exploring",
    greeting: "Where to today?",
    assistant: "I’m here to help plan your journey. Ask me anything travel related.",
    forYou: "For you",
    exploreMore: "Explore more",
    places: "Places",
    recommendations: "Recommendations",
    images: "Images",
    sources: "Sources",
    ask: "Ask anything...",
    selectForAi: "Ask about Azerbaijan's historical places...", aiGreeting: "Hello! Ask me about Azerbaijan's historical places. If you select a place on the map, I will answer only about that place.", aiRefusal: "I can only answer about Azerbaijan's historical places available in this project.", aiError: "No response was received. Please try again.", thinking: "Preparing an answer...",
    routeShortcut: "View route options",
    selected: "Selected place",
    details: "More details",
    close: "Close",
  },
  tr: {
    discover:"Keşfet",map:"Harita",about:"Hakkımızda",search:"Mekân, şehir veya dönem ara...",bannerTitle:"Azerbaycan'ı bizimle keşfet!",bannerText:"Tarihi mekânlardan gizli doğa harikalarına kadar yeni rotanı oluştur.",explore:"Keşfe başla",greeting:"Bugün nereye gidiyoruz?",assistant:"Seyahatini planlamana yardım edeceğim. İstediğini sor.",forYou:"Senin için",exploreMore:"Daha fazla keşfet",places:"Mekânlar",recommendations:"Öneriler",images:"Fotoğraflar",sources:"Kaynaklar",ask:"Bana sor...",selectForAi:"Azerbaycan'ın tarihî yerleri hakkında sor...",aiGreeting:"Merhaba! Azerbaycan'ın tarihî yerleri hakkında soru sorabilirsiniz. Haritadan bir yer seçerseniz yalnızca o yer hakkında cevap vereceğim.",aiRefusal:"Yalnızca projede bulunan Azerbaycan tarihî yerleri hakkında cevap verebilirim.",aiError:"Yanıt alınamadı. Lütfen tekrar deneyin.",thinking:"Yanıt hazırlanıyor...",routeShortcut:"Rota seçeneklerini gör",selected:"Seçilmiş mekân",details:"Detaylı bilgi",close:"Kapat",
  },
  ru: {
    discover:"Обзор",map:"Карта",about:"О нас",search:"Поиск места, города или эпохи...",bannerTitle:"Откройте Азербайджан вместе с нами!",bannerText:"Создайте маршрут от исторических мест до скрытых чудес природы.",explore:"Начать путешествие",greeting:"Куда отправимся сегодня?",assistant:"Я помогу спланировать путешествие. Задайте любой вопрос.",forYou:"Для вас",exploreMore:"Больше мест",places:"Места",recommendations:"Рекомендации",images:"Фотографии",sources:"Источники",ask:"Спросите меня...",selectForAi:"Спросите об исторических местах Азербайджана...",aiGreeting:"Здравствуйте! Спросите меня об исторических местах Азербайджана. Если выбрать место на карте, я буду отвечать только о нём.",aiRefusal:"Я могу отвечать только об исторических местах Азербайджана, представленных в проекте.",aiError:"Ответ не получен. Пожалуйста, повторите попытку.",thinking:"Подготовка ответа...",routeShortcut:"Посмотреть варианты маршрута",selected:"Выбранное место",details:"Подробнее",close:"Закрыть",
  },
};

copy.tr.bannerTitle = "Azerbaycan'ın tarihî mirasını yakından tanı";
copy.tr.bannerText = "Kaleleri, sarayları ve kadim yapıları haritada keşfet; kendi kültür rotanı oluştur.";
copy.ru.bannerTitle = "Познакомьтесь с историческим наследием Азербайджана";
copy.ru.bannerText = "Найдите на карте крепости, дворцы и древние памятники и составьте свой культурный маршрут.";

export default function Home() {
  const router = useRouter();
  const { lang, setLang, theme, setTheme } = usePreferences();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [query, setQuery] = useState("");
  const [chatValue, setChatValue] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const mapPanelRef = useRef(null);
  const selectedPlaceRef = useRef(null);
  const chatRequestRef = useRef(0);
  const t = copy[lang];
  const contentLang = lang;
  const filteredPlaces = useMemo(() => {
    const term = query.trim().toLocaleLowerCase(lang === "az" ? "az" : "en");
    if (!term) return places;
    return places.filter((place) =>
      [...Object.values(place.name), ...Object.values(place.city), ...Object.values(place.period)]
        .join(" ")
        .toLocaleLowerCase(lang === "az" ? "az" : "en")
        .includes(term)
    );
  }, [query, lang]);

  const resetChat = useCallback(() => {
    chatRequestRef.current += 1;
    setChatMessages([]);
    setChatValue("");
    setChatLoading(false);
  }, []);

  const selectPlace = useCallback((place) => {
    resetChat();
    setSelectedPlace(place);
  }, [resetChat]);

  const changeLanguage = useCallback((nextLang) => {
    resetChat();
    setLang(nextLang);
  }, [resetChat, setLang]);

  const sendChatMessage = async (event) => {
    event.preventDefault();
    const question = chatValue.trim();
    if (!question || chatLoading) return;

    const placeAtRequest = selectedPlace;
    const requestId = ++chatRequestRef.current;
    const previousMessages = chatMessages.slice(-6).map(({ role, content }) => ({ role, content }));
    setChatValue("");
    setChatMessages((messages) => [...messages, { role: "user", content: question }]);
    setChatLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history: previousMessages, placeId: placeAtRequest?.id ?? null, lang }),
      });
      if (!response.ok) {
        setChatMessages((messages) => [...messages, { role: "assistant", content: t.aiError }]);
        return;
      }
      if (chatRequestRef.current !== requestId) return;
      const result = await response.json();
      const mappedPlace = result.placeId ? places.find((item) => item.id === result.placeId) : null;
      if (mappedPlace) setSelectedPlace(mappedPlace);
      setChatMessages((messages) => [...messages, {
        role: "assistant",
        content: result.answer || t.aiError,
        routeSlug: mappedPlace && result.mapAction === "route" ? mappedPlace.slug : null,
      }]);
    } catch (error) {
      console.error("AI request failed:", error);
      if (chatRequestRef.current === requestId) {
        setChatMessages((messages) => [...messages, { role: "assistant", content: t.aiError }]);
      }
    } finally {
      if (chatRequestRef.current === requestId) setChatLoading(false);
    }
  };

  const pickPlace = (place) => {
    selectPlace(place);
    setQuery("");
  };

  useEffect(() => {
    const handleFullscreen = () => {
      if (document.fullscreenElement === mapPanelRef.current) setIsMapFullscreen(true);
      else if (document.fullscreenElement === null && mapPanelRef.current?.dataset.fullscreenMode === "native") {
        delete mapPanelRef.current.dataset.fullscreenMode;
        setIsMapFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreen);
    return () => document.removeEventListener("fullscreenchange", handleFullscreen);
  }, []);

  useEffect(() => {
    if (!isMapFullscreen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && mapPanelRef.current?.dataset.fullscreenMode === "css") {
        delete mapPanelRef.current.dataset.fullscreenMode;
        setIsMapFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMapFullscreen]);

  useEffect(() => {
    if (!selectedPlace || isMapFullscreen || !window.matchMedia("(max-width: 700px)").matches) return undefined;

    const scrollTimer = window.setTimeout(() => {
      selectedPlaceRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 180);

    return () => window.clearTimeout(scrollTimer);
  }, [selectedPlace, isMapFullscreen]);

  const toggleMapFullscreen = async () => {
    const panel = mapPanelRef.current;
    if (!panel) return;

    if (isMapFullscreen) {
      if (document.fullscreenElement === panel) await document.exitFullscreen();
      else {
        delete panel.dataset.fullscreenMode;
        setIsMapFullscreen(false);
      }
      return;
    }

    const useCssFullscreen = window.matchMedia("(max-width: 700px)").matches || !panel.requestFullscreen;
    if (useCssFullscreen) {
      panel.dataset.fullscreenMode = "css";
      setIsMapFullscreen(true);
      return;
    }

    try {
      panel.dataset.fullscreenMode = "native";
      await panel.requestFullscreen();
    } catch {
      panel.dataset.fullscreenMode = "css";
      setIsMapFullscreen(true);
    }
  };

  const focusMap = () => {
    mapPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => document.querySelector(".map-search-input")?.focus({ preventScroll: true }), 650);
  };

  return (
    <main className={`travel-shell theme-${theme}`}>
      <aside className={`side-rail ${mobileNav ? "mobile-open" : ""}`}>
        <a className="rail-logo" href="#workspace" aria-label="MyAzerbaijan">
          <img className="site-logo" src={logo.src} alt="" />
        </a>
        <nav className="rail-nav" aria-label="Main navigation">
          <a href="#workspace" className="active" title={t.discover}><HomeIcon /></a>
          <a href="/places" title={t.places}><Images /></a>
          <a href="#assistant" title="AI"><Bot /></a>
          <a href="/about" title={t.about}><Info /></a>
          <a href="/contact" title="Contact"><Mail /></a>
        </nav>
      </aside>

      <section id="workspace" className="workspace">
        <header className="workspace-header">
          <a className="mobile-brand" href="#workspace">
            <img className="site-logo" src={logo.src} alt="" />
            <strong>MyAzerbaijan</strong>
          </a>
          <div className="header-actions">
            <LanguageSelector value={lang} onChange={changeLanguage} />
            <button className="theme-button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={theme === "light" ? "Dark mode" : "Light mode"}>
              {theme === "light" ? <Moon /> : <Sun />}
            </button>
            <button className="mobile-nav-button" onClick={() => setMobileNav((value) => !value)}>
              {mobileNav ? <X /> : <Menu />}
            </button>
          </div>
        </header>

        <section className="invite-banner">
          <div><h1>{t.bannerTitle}</h1><p>{t.bannerText}</p></div>
          <div className="banner-route" aria-hidden="true"><i /><i /><i /></div>
          <button onClick={focusMap}>{t.explore}</button>
        </section>

        <div className="dashboard-grid">
          <section id="map" ref={mapPanelRef} className={`map-panel ${isMapFullscreen ? "is-map-fullscreen" : ""}`}>
            <Map places={filteredPlaces} lang={contentLang} selectedPlace={selectedPlace} onSelectPlace={selectPlace} theme={theme} />

            <button className="map-fullscreen-button" onClick={toggleMapFullscreen} aria-label={isMapFullscreen ? "Exit fullscreen" : "Open map fullscreen"}>
              {isMapFullscreen ? <Minimize2 /> : <Maximize2 />}
            </button>

            <motion.div className="assistant-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="assistant-title"><div><h2>{t.greeting}</h2><p>{t.assistant}</p></div><Sparkles /></div>
              <div className="quick-picks">
                {places.slice(0, 4).map((place) => (
                  <button key={place.id} className={selectedPlace?.id === place.id ? "active" : ""} onClick={() => pickPlace(place)}>
                    {place.name[contentLang]} <MapPin />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* <label className="map-search-box">
              <Search />
              <input className="map-search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} />
              {query && <button onClick={() => setQuery("")} aria-label={t.close}><X /></button>}
              <span>{filteredPlaces.length}</span>
            </label> */}

            <AnimatePresence mode="wait">
              {isMapFullscreen && selectedPlace && (
                <motion.aside key={selectedPlace.id} className="map-place-preview" role="link" tabIndex={0} onClick={() => router.push(`/places/${selectedPlace.slug}`)} onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); router.push(`/places/${selectedPlace.slug}`); } }} initial={{ opacity: 0, y: 14, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }}>
                  <img src={getPlaceImage(selectedPlace.id)} alt={selectedPlace.name[contentLang]} />
                  <div className="map-preview-info">
                    <button className="map-preview-close" onClick={(event) => { event.stopPropagation(); selectPlace(null); }} aria-label={t.close}><X /></button>
                    <h3>{selectedPlace.name[contentLang]}</h3>
                    <span>{selectedPlace.period[contentLang]}</span>
                    <Link href={`/places/${selectedPlace.slug}`} onClick={(event) => event.stopPropagation()}>{t.details}<ArrowRight /></Link>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

          </section>

          <aside id="recommendations" className="discover-panel">
            <div className="panel-heading">
              <div><span>{t.forYou}</span><MapPin /><strong>{selectedPlace?.city[contentLang] || "Azerbaijan"}</strong></div>
              <button onClick={() => router.push("/places")}>{t.exploreMore}<ArrowRight /></button>
            </div>

            <div className="story-row">
              {places.slice(0, 3).map((place, index) => (
                <button key={place.id} className="story-card" onClick={() => router.push(`/places/${place.slug}`)}>
                  <img src={getPlaceImage(place.id)} alt="" loading="lazy" decoding="async" />
                  <span className="story-number">0{index + 1}</span>
                  <strong>{place.name[contentLang]}</strong>
                  <small>{place.shortDescription[contentLang]}</small>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {!isMapFullscreen && selectedPlace && (
                <motion.aside ref={selectedPlaceRef} key={selectedPlace.id} className="place-detail place-detail-compact" role="link" tabIndex={0} onClick={() => router.push(`/places/${selectedPlace.slug}`)} onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); router.push(`/places/${selectedPlace.slug}`); } }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <img src={getPlaceImage(selectedPlace.id)} alt={selectedPlace.name[contentLang]} />
                  <div className="compact-place-info">
                    <span>{t.selected}</span>
                    <h2>{selectedPlace.name[contentLang]}</h2>
                    <strong>{selectedPlace.period[contentLang]}</strong>
                  </div>
                  <div className="compact-place-actions">
                    <button className="detail-close compact-close" onClick={(event) => { event.stopPropagation(); selectPlace(null); }} aria-label={t.close} title={t.close}><X /></button>
                    <Link className="detail-more" href={`/places/${selectedPlace.slug}`} onClick={(event) => event.stopPropagation()}>{t.details}<ArrowRight /></Link>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            <div id="assistant" className="panel-assistant">
              <div className="panel-assistant-heading"><span><Sparkles />MyAzerbaijan AI</span><small>Travel assistant</small></div>
              <div className="assistant-conversation">
                <div className="ai-message">
                  {t.aiGreeting}
                </div>
                {selectedPlace && (
                  <div className="ai-context">
                    <MapPin />
                    <span>{selectedPlace.name[contentLang]} {lang === "az" ? "haqqında soruş" : lang === "tr" ? "hakkında sor" : lang === "ru" ? "выбрано" : "is selected"}</span>
                  </div>
                )}
                {chatMessages.map((message, index) => (
                  <div className={message.role === "user" ? "user-preview" : "ai-message"} key={`${message.role}-${index}`}>
                    <span>{message.content}</span>
                    {message.routeSlug && <Link className="ai-route-shortcut" href={`/places/${message.routeSlug}#route-options`}>{t.routeShortcut}<ArrowRight /></Link>}
                  </div>
                ))}
                {chatLoading && <div className="ai-message ai-loading">{t.thinking}</div>}
              </div>
              <form className="ask-bar" onSubmit={sendChatMessage}>
                <input value={chatValue} onChange={(event) => setChatValue(event.target.value)} placeholder={selectedPlace ? t.ask : t.selectForAi} disabled={chatLoading} />
                <button className="send-button" type="submit" aria-label="Send" disabled={!chatValue.trim() || chatLoading}><Send /></button>
              </form>
            </div>
          </aside>
        </div>

        <footer id="about" className="workspace-footer">
          <span><Globe2 /> MyAzerbaijan — Digital travel atlas</span>
        </footer>
      </section>
    </main>
  );
}
