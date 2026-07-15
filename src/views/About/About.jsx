"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  Heart,
  Layers3,
  MapPinned,
  Menu,
  Moon,
  Route,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import SiteRail from "../../components/SiteRail/SiteRail";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import { usePreferences } from "../../context/usePreferences";
import { getPlaceImages } from "../../data/placeMedia";
import logo from "../../assets/icons/logo.svg";
import "./About.css";

const [towerOne, towerTwo, towerThree] = getPlaceImages(1);

const copy = {
  az: {
    eyebrow: "Biz kimik?",
    title: "Azərbaycanı daha yaxın hiss etmək üçün.",
    intro: "MyAzerbaijan ölkənin tarixini, mədəniyyətini və unudulmaz məkanlarını müasir rəqəmsal təcrübədə bir araya gətirən səyahət platformasıdır.",
    explore: "Məkanları kəşf et",
    story: "Hekayəmiz",
    storyTitle: "Hər məkanın danışmağa dəyər bir hekayəsi var.",
    storyText: "Biz Azərbaycanı sadəcə xəritədəki nöqtələr kimi deyil, zamanın, insanların və yaddaşın yaratdığı canlı bir hekayə kimi təqdim edirik. Məqsədimiz səyahət planlamağı sadələşdirmək və mədəni irsi hər kəs üçün daha əlçatan etməkdir.",
    quote: "Yaxşı səyahət istiqamətlə başlamır — maraqla başlayır.",
    principles: "Bizi istiqamətləndirən dəyərlər",
    principlesIntro: "Dəqiq məlumatdan ilhamverici dizayna qədər hər qərarımız daha mənalı kəşf təcrübəsi yaratmağa xidmət edir.",
    cards: [
      ["Mədəni irs", "Tarixi məkanların kimliyini və kontekstini qoruyaraq onları yeni nəsillərə çatdırırıq."],
      ["Ağıllı kəşf", "Xəritə, seçilmiş məzmun və rəqəmsal köməkçi ilə səyahəti daha rahat edirik."],
      ["Etibarlı məlumat", "Məzmunu aydın mənbələrə və yoxlanıla bilən məlumatlara əsaslandırırıq."],
      ["İnsan mərkəzli", "Hər ekranı sadə, əlçatan və zövqlü istifadə təcrübəsi üçün hazırlayırıq."],
    ],
    experience: "Bir platforma, bütün səyahət",
    experienceText: "İlhamdan marşruta, xəritədən tarixi detala qədər ehtiyacınız olan hər şeyi eyni təcrübədə birləşdiririk.",
    steps: [["01", "Kəşf et", "Seçilmiş məkanlar və hekayələrlə tanış ol."], ["02", "Planla", "Xəritədə istiqamətini və dayanacaqlarını qur."], ["03", "Yola çıx", "Azərbaycanı öz ritmində yaşa və xatırla."]],
    stats: [["45+", "tarixi məkan"], ["4", "dil seçimi"], ["1", "interaktiv atlas"]],
    ctaEyebrow: "Növbəti hekayəniz",
    ctaTitle: "Azərbaycan sizi gözləyir.",
    ctaText: "Qədim qala divarlarından Xəzərin sahilinə qədər yeni marşrutunuzu bu gün yaradın.",
    cta: "Kəşfə başla",
    footer: "Azərbaycan üçün hazırlanmış rəqəmsal səyahət atlası.",
  },
  en: {
    eyebrow: "Who we are",
    title: "Made to bring Azerbaijan closer.",
    intro: "MyAzerbaijan is a travel platform that brings the country's history, culture and unforgettable places together in a modern digital experience.",
    explore: "Explore places",
    story: "Our story",
    storyTitle: "Every place has a story worth telling.",
    storyText: "We present Azerbaijan not merely as points on a map, but as a living story shaped by time, people and memory. Our goal is to simplify travel planning and make cultural heritage more accessible to everyone.",
    quote: "A great journey does not begin with directions — it begins with curiosity.",
    principles: "Values that guide us",
    principlesIntro: "From accurate information to inspiring design, every decision helps create a more meaningful discovery experience.",
    cards: [["Cultural heritage", "We preserve the identity and context of historic places while carrying them to new generations."], ["Smart discovery", "Maps, curated content and a digital assistant make every journey easier."], ["Trusted information", "We ground our content in clear sources and verifiable information."], ["Human centred", "Every screen is designed to feel simple, accessible and enjoyable."]],
    experience: "One platform, the whole journey",
    experienceText: "From inspiration to routes, maps to historical detail, everything you need comes together in one experience.",
    steps: [["01", "Discover", "Meet curated places and the stories behind them."], ["02", "Plan", "Build your direction and stops on the map."], ["03", "Go", "Experience Azerbaijan at your own rhythm."]],
    stats: [["45+", "historic places"], ["4", "languages"], ["1", "interactive atlas"]],
    ctaEyebrow: "Your next story",
    ctaTitle: "Azerbaijan is waiting.",
    ctaText: "From ancient fortress walls to the Caspian coast, create your next route today.",
    cta: "Start exploring",
    footer: "A digital travel atlas made for Azerbaijan.",
  },
  tr: {
    eyebrow: "Biz kimiz?", title: "Azerbaycan'ı daha yakından hissetmek için.", intro: "MyAzerbaijan, ülkenin tarihini, kültürünü ve unutulmaz yerlerini modern bir dijital deneyimde buluşturan seyahat platformudur.", explore: "Mekânları keşfet", story: "Hikâyemiz", storyTitle: "Her yerin anlatılmaya değer bir hikâyesi var.", storyText: "Azerbaycan'ı yalnızca haritadaki noktalar olarak değil; zamanın, insanların ve hafızanın şekillendirdiği canlı bir hikâye olarak sunuyoruz. Amacımız seyahat planlamayı kolaylaştırmak ve kültürel mirası herkes için erişilebilir kılmak.", quote: "İyi bir yolculuk yön tarifiyle değil, merakla başlar.", principles: "Bize yön veren değerler", principlesIntro: "Doğru bilgiden ilham veren tasarıma kadar her kararımız daha anlamlı bir keşif deneyimine hizmet eder.", cards: [["Kültürel miras", "Tarihî yerlerin kimliğini ve bağlamını koruyarak gelecek nesillere aktarıyoruz."], ["Akıllı keşif", "Harita, seçilmiş içerik ve dijital asistanla yolculuğu kolaylaştırıyoruz."], ["Güvenilir bilgi", "İçeriğimizi açık kaynaklara ve doğrulanabilir bilgilere dayandırıyoruz."], ["İnsan odaklı", "Her ekranı sade, erişilebilir ve keyifli bir deneyim için tasarlıyoruz."]], experience: "Tek platform, tüm yolculuk", experienceText: "İlhamdan rotaya, haritadan tarihî ayrıntılara kadar ihtiyacınız olan her şeyi tek deneyimde birleştiriyoruz.", steps: [["01", "Keşfet", "Seçilmiş yerleri ve hikâyelerini tanı."], ["02", "Planla", "Haritada yönünü ve duraklarını oluştur."], ["03", "Yola çık", "Azerbaycan'ı kendi ritminde yaşa."]], stats: [["45+", "tarihî mekân"], ["4", "dil seçeneği"], ["1", "interaktif atlas"]], ctaEyebrow: "Sıradaki hikâyeniz", ctaTitle: "Azerbaycan sizi bekliyor.", ctaText: "Kadim kale duvarlarından Hazar kıyısına yeni rotanızı bugün oluşturun.", cta: "Keşfe başla", footer: "Azerbaycan için hazırlanmış dijital seyahat atlası.",
  },
  ru: {
    eyebrow: "Кто мы", title: "Чтобы Азербайджан стал ближе.", intro: "MyAzerbaijan — туристическая платформа, объединяющая историю, культуру и незабываемые места страны в современном цифровом формате.", explore: "Открыть места", story: "Наша история", storyTitle: "У каждого места есть история, достойная рассказа.", storyText: "Мы показываем Азербайджан не просто как точки на карте, а как живую историю, созданную временем, людьми и памятью. Наша цель — упростить планирование путешествий и сделать культурное наследие доступнее для всех.", quote: "Хорошее путешествие начинается не с маршрута, а с любопытства.", principles: "Наши ориентиры", principlesIntro: "От точной информации до вдохновляющего дизайна — каждое решение создаёт более осмысленный опыт открытий.", cards: [["Культурное наследие", "Мы сохраняем самобытность и контекст исторических мест для новых поколений."], ["Умные открытия", "Карта, отборный контент и цифровой помощник делают путешествие проще."], ["Надёжные сведения", "Наш контент основан на ясных источниках и проверяемой информации."], ["В центре — человек", "Каждый экран создан простым, доступным и приятным."]], experience: "Одна платформа — всё путешествие", experienceText: "От вдохновения до маршрута, от карты до исторических деталей — всё необходимое собрано вместе.", steps: [["01", "Откройте", "Познакомьтесь с избранными местами и историями."], ["02", "Спланируйте", "Создайте маршрут и остановки на карте."], ["03", "Отправляйтесь", "Исследуйте Азербайджан в своём ритме."]], stats: [["45+", "исторических мест"], ["4", "языка"], ["1", "интерактивный атлас"]], ctaEyebrow: "Ваша следующая история", ctaTitle: "Азербайджан ждёт вас.", ctaText: "От древних крепостных стен до Каспийского побережья — создайте новый маршрут сегодня.", cta: "Начать знакомство", footer: "Цифровой туристический атлас Азербайджана.",
  },
};

const valueIcons = [BookOpen, MapPinned, ShieldCheck, Heart];

export default function About() {
  const { lang, setLang, theme, setTheme } = usePreferences();
  const [mobileNav, setMobileNav] = useState(false);
  const reduceMotion = useReducedMotion();
  const t = copy[lang];
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <main className={`about-shell theme-${theme}`}>
      <SiteRail active="about" mobileOpen={mobileNav} />
      <div className="about-main">
        <header className="about-nav">
          <Link href="/" className="about-brand"><img className="site-logo" src={logo.src} alt="" /><strong>MyAzerbaijan</strong></Link>
          <div className="about-tools">
            <LanguageSelector value={lang} onChange={setLang} />
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Theme">{theme === "light" ? <Moon /> : <Sun />}</button>
            <button className="about-menu" onClick={() => setMobileNav((value) => !value)} aria-label="Menu">{mobileNav ? <X /> : <Menu />}</button>
          </div>
        </header>

        <section className="about-hero">
          <motion.div className="about-hero-copy" initial={reduceMotion ? false : { opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .75 }}>
            <span className="about-kicker"><Sparkles />{t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
            <Link href="/places">{t.explore}<ArrowUpRight /></Link>
          </motion.div>
          <motion.div className="about-collage" initial={reduceMotion ? false : { opacity: 0, scale: .94, rotate: 1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .9, delay: .1 }}>
            <div className="collage-main"><img src={towerOne} alt="Maiden Tower in Baku" /></div>
            <div className="collage-small"><img src={towerTwo} alt="Historic Baku architecture" /></div>
            <div className="collage-note"><Compass /><span>40.3667° N<br />49.8372° E</span></div>
          </motion.div>
          <div className="about-orbit" aria-hidden="true"><i /><i /><i /></div>
        </section>

        <section className="about-stats" aria-label="Platform statistics">
          {t.stats.map(([number, label], index) => <motion.div key={label} {...reveal} transition={{ ...reveal.transition, delay: index * .08 }}><strong>{number}</strong><span>{label}</span></motion.div>)}
          <div className="stats-sign"><Route /></div>
        </section>

        <motion.section className="about-story" {...reveal}>
          <div className="story-visual"><img src={towerThree} alt="Azerbaijan cultural heritage" /><span><Layers3 />Mədəniyyət • Tarix • Səyahət</span></div>
          <div className="story-copy">
            <span className="section-label">{t.story}</span>
            <h2>{t.storyTitle}</h2>
            <p>{t.storyText}</p>
            <blockquote>“{t.quote}”</blockquote>
          </div>
        </motion.section>

        <section className="about-values">
          <motion.div className="section-heading" {...reveal}><span className="section-label">MyAzerbaijan DNA</span><h2>{t.principles}</h2><p>{t.principlesIntro}</p></motion.div>
          <div className="value-grid">
            {t.cards.map(([title, text], index) => {
              const Icon = valueIcons[index];
              return <motion.article key={title} {...reveal} transition={{ ...reveal.transition, delay: index * .07 }}><div><Icon /></div><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></motion.article>;
            })}
          </div>
        </section>

        <motion.section className="about-experience" {...reveal}>
          <div className="experience-heading"><span className="section-label">Digital journey</span><h2>{t.experience}</h2><p>{t.experienceText}</p></div>
          <div className="experience-steps">
            {t.steps.map(([number, title, text], index) => <div className="experience-step" key={number}><span>{number}</span><div className="step-icon">{index === 0 ? <Compass /> : index === 1 ? <MapPinned /> : <Users />}</div><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </motion.section>

        <motion.section className="about-cta" {...reveal}>
          <div><span>{t.ctaEyebrow}</span><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p></div>
          <Link href="/places">{t.cta}<ArrowUpRight /></Link>
        </motion.section>

        <footer className="about-footer"><Link href="/"><img className="site-logo" src={logo.src} alt="" />MyAzerbaijan</Link><p>{t.footer}</p><span>© 2026</span></footer>
      </div>
    </main>
  );
}
