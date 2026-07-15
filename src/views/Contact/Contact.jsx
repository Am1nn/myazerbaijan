"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Menu,
  MessageCircleMore,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import Link from "next/link";
import SiteRail from "../../components/SiteRail/SiteRail";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import { usePreferences } from "../../context/usePreferences";
import logo from "../../assets/icons/logo.svg";
import "./Contact.css";

const copy = {
  az: {
    eyebrow: "Bizimlə əlaqə",
    title: "Səyahətiniz bir salamla başlasın.",
    intro: "Sualınız, təklifiniz və ya paylaşmaq istədiyiniz bir hekayə var? Komandamız sizi dinləməyə hazırdır.",
    availability: "Adətən 24 saat ərzində cavab veririk",
    formTitle: "Bizə mesaj göndərin",
    formText: "Aşağıdakı formanı doldurun, ən qısa zamanda sizinlə əlaqə saxlayaq.",
    name: "Ad və soyad", email: "E-poçt", subject: "Mövzu", message: "Mesajınız",
    namePh: "Adınızı daxil edin", emailPh: "siz@email.com", subjectPh: "Necə kömək edə bilərik?", messagePh: "Fikrinizi bizimlə bölüşün...",
    send: "Mesajı hazırla", sent: "Mesajınız hazırdır",
    sentText: "E-poçt tətbiqiniz açılacaq. Mesajı göndərməzdən əvvəl son dəfə yoxlaya bilərsiniz.",
    direct: "Birbaşa əlaqə", office: "Bakı ofisi", officeText: "İçərişəhər, Bakı, Azərbaycan",
    mail: "E-poçt", phone: "Telefon", hours: "İş saatları", hoursText: "B.e. – Cümə, 09:00 – 18:00",
    explore: "Bu arada Azərbaycanı kəşf edin", places: "Məkanlara bax",
    footer: "Azərbaycan üçün hazırlanmış rəqəmsal səyahət atlası.", required: "Bu sahəni doldurun.", invalidEmail: "Düzgün e-poçt ünvanı daxil edin.",
  },
  en: {
    eyebrow: "Get in touch", title: "Let your journey begin with hello.", intro: "Have a question, an idea, or a story worth sharing? Our team is ready to listen.", availability: "We usually reply within 24 hours",
    formTitle: "Send us a message", formText: "Fill in the form and we will get back to you as soon as possible.", name: "Full name", email: "Email", subject: "Subject", message: "Your message",
    namePh: "Enter your name", emailPh: "you@email.com", subjectPh: "How can we help?", messagePh: "Share your thoughts with us...", send: "Prepare message", sent: "Your message is ready", sentText: "Your email app will open. You can review the message before sending it.",
    direct: "Direct contact", office: "Baku office", officeText: "Old City, Baku, Azerbaijan", mail: "Email", phone: "Phone", hours: "Working hours", hoursText: "Mon – Fri, 09:00 – 18:00", explore: "Explore Azerbaijan in the meantime", places: "View places", footer: "A digital travel atlas made for Azerbaijan.", required: "Please complete this field.", invalidEmail: "Enter a valid email address.",
  },
  tr: {
    eyebrow: "Bize ulaşın", title: "Yolculuğunuz bir merhabayla başlasın.", intro: "Bir sorunuz, fikriniz ya da paylaşmak istediğiniz bir hikâye mi var? Ekibimiz sizi dinlemeye hazır.", availability: "Genellikle 24 saat içinde yanıtlıyoruz",
    formTitle: "Bize mesaj gönderin", formText: "Formu doldurun, en kısa sürede sizinle iletişime geçelim.", name: "Ad soyad", email: "E-posta", subject: "Konu", message: "Mesajınız", namePh: "Adınızı girin", emailPh: "siz@email.com", subjectPh: "Nasıl yardımcı olabiliriz?", messagePh: "Düşüncelerinizi bizimle paylaşın...", send: "Mesajı hazırla", sent: "Mesajınız hazır", sentText: "E-posta uygulamanız açılacak. Göndermeden önce mesajı kontrol edebilirsiniz.", direct: "Doğrudan iletişim", office: "Bakü ofisi", officeText: "İçerişehir, Bakü, Azerbaycan", mail: "E-posta", phone: "Telefon", hours: "Çalışma saatleri", hoursText: "Pzt – Cum, 09:00 – 18:00", explore: "Bu sırada Azerbaycan'ı keşfedin", places: "Mekânlara bak", footer: "Azerbaycan için hazırlanmış dijital seyahat atlası.", required: "Bu alanı doldurun.", invalidEmail: "Geçerli bir e-posta adresi girin.",
  },
  ru: {
    eyebrow: "Связаться с нами", title: "Пусть путешествие начнётся с приветствия.", intro: "Есть вопрос, идея или история, которой хочется поделиться? Наша команда готова вас выслушать.", availability: "Обычно отвечаем в течение 24 часов",
    formTitle: "Отправьте нам сообщение", formText: "Заполните форму, и мы свяжемся с вами как можно скорее.", name: "Имя и фамилия", email: "Эл. почта", subject: "Тема", message: "Сообщение", namePh: "Введите ваше имя", emailPh: "you@email.com", subjectPh: "Чем мы можем помочь?", messagePh: "Поделитесь с нами своими мыслями...", send: "Подготовить письмо", sent: "Ваше письмо готово", sentText: "Откроется почтовое приложение. Проверьте письмо перед отправкой.", direct: "Прямая связь", office: "Офис в Баку", officeText: "Ичери-шехер, Баку, Азербайджан", mail: "Эл. почта", phone: "Телефон", hours: "Часы работы", hoursText: "Пн – Пт, 09:00 – 18:00", explore: "А пока откройте для себя Азербайджан", places: "Смотреть места", footer: "Цифровой туристический атлас Азербайджана.", required: "Заполните это поле.", invalidEmail: "Введите корректный адрес.",
  },
};

export default function Contact() {
  const { lang, setLang, theme, setTheme } = usePreferences();
  const [mobileNav, setMobileNav] = useState(false);
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(false);
  const reduceMotion = useReducedMotion();
  const t = copy[lang] || copy.az;
  const reveal = { initial: reduceMotion ? false : { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .2 }, transition: { duration: .6, ease: [0.22, 1, 0.36, 1] } };

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = {};
    ["name", "email", "subject", "message"].forEach((field) => { if (!data.get(field)?.trim()) nextErrors[field] = t.required; });
    if (data.get("email") && !/^\S+@\S+\.\S+$/.test(data.get("email"))) nextErrors.email = t.invalidEmail;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setPrepared(true);
    const subject = encodeURIComponent(`[MyAzerbaijan] ${data.get("subject")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")}\n${data.get("email")}`);
    window.location.href = `mailto:hello@myazerbaijan.az?subject=${subject}&body=${body}`;
  }

  const contactCards = [
    { Icon: MapPin, label: t.office, value: t.officeText, href: "https://maps.google.com/?q=Icherisheher+Baku" },
    { Icon: Mail, label: t.mail, value: "hello@myazerbaijan.az", href: "mailto:hello@myazerbaijan.az" },
    { Icon: Phone, label: t.phone, value: "+994 12 555 01 01", href: "tel:+994125550101" },
    { Icon: Clock3, label: t.hours, value: t.hoursText },
  ];

  return <main className={`contact-shell theme-${theme}`}>
    <SiteRail active="contact" mobileOpen={mobileNav} />
    <div className="contact-main">
      <header className="contact-nav">
        <Link href="/" className="contact-brand"><img className="site-logo" src={logo.src} alt="" /><strong>MyAzerbaijan</strong></Link>
        <div className="contact-tools"><LanguageSelector value={lang} onChange={setLang} /><button onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Theme">{theme === "light" ? <Moon /> : <Sun />}</button><button className="contact-menu" onClick={() => setMobileNav((value) => !value)} aria-label="Menu">{mobileNav ? <X /> : <Menu />}</button></div>
      </header>

      <section className="contact-hero">
        <motion.div className="contact-hero-copy" initial={reduceMotion ? false : { opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .75 }}>
          <span className="contact-kicker"><Sparkles />{t.eyebrow}</span><h1>{t.title}</h1><p>{t.intro}</p><span className="contact-status"><i />{t.availability}</span>
        </motion.div>
        <motion.div className="contact-symbol" initial={reduceMotion ? false : { opacity: 0, scale: .75, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .8, delay: .12, type: "spring" }}><div><MessageCircleMore /></div><span className="symbol-dot one" /><span className="symbol-dot two" /><span className="symbol-dot three" /></motion.div>
      </section>

      <section className="contact-content">
        <motion.div className="contact-form-card" {...reveal}>
          <div className="contact-section-title"><span>01 / Message</span><h2>{t.formTitle}</h2><p>{t.formText}</p></div>
          {prepared && <motion.div className="contact-success" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} role="status"><CheckCircle2 /><div><strong>{t.sent}</strong><span>{t.sentText}</span></div></motion.div>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="contact-field-row"><Field id="name" label={t.name} placeholder={t.namePh} error={errors.name} /><Field id="email" type="email" label={t.email} placeholder={t.emailPh} error={errors.email} /></div>
            <Field id="subject" label={t.subject} placeholder={t.subjectPh} error={errors.subject} />
            <Field id="message" label={t.message} placeholder={t.messagePh} error={errors.message} textarea />
            <button className="contact-submit" type="submit"><span>{t.send}</span><Send /></button>
          </form>
        </motion.div>

        <motion.aside className="contact-details" {...reveal} transition={{ ...reveal.transition, delay: .1 }}>
          <div className="contact-section-title"><span>02 / Contact</span><h2>{t.direct}</h2></div>
          <div className="contact-card-list">{contactCards.map(({ Icon, label, value, href }, index) => {
            const content = <><div className="contact-card-icon"><Icon /></div><div><span>{label}</span><strong>{value}</strong></div>{href && <ArrowUpRight className="card-arrow" />}</>;
            return href ? <a key={label} href={href} target={index === 0 ? "_blank" : undefined} rel={index === 0 ? "noreferrer" : undefined}>{content}</a> : <div key={label}>{content}</div>;
          })}</div>
          <div className="contact-explore"><div><span>{t.explore}</span><Link href="/places">{t.places}<ArrowUpRight /></Link></div><div className="explore-rings" aria-hidden="true"><i /><i /><i /></div></div>
        </motion.aside>
      </section>

      <footer className="contact-footer"><Link href="/"><img className="site-logo" src={logo.src} alt="" />MyAzerbaijan</Link><p>{t.footer}</p><span>© 2026</span></footer>
    </div>
  </main>;
}

function Field({ id, label, placeholder, error, type = "text", textarea = false }) {
  const Tag = textarea ? "textarea" : "input";
  return <label className={`contact-field ${error ? "has-error" : ""}`}><span>{label}</span><Tag id={id} name={id} type={textarea ? undefined : type} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />{error && <small id={`${id}-error`}>{error}</small>}</label>;
}
