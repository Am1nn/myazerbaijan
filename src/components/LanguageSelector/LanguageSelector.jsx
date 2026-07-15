"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import flagAz from "../../assets/images/flag_az.jpg";
import flagTr from "../../assets/images/flag_tr.png";
import flagRu from "../../assets/images/flag_ru.png";
import flagEn from "../../assets/images/flag_en.png";
import "./LanguageSelector.css";

const languages = [
  { code: "az", short: "AZ", label: "Azərbaycan", flag: flagAz.src },
  { code: "tr", short: "TR", label: "Türkçe", flag: flagTr.src },
  { code: "ru", short: "RU", label: "Русский", flag: flagRu.src },
  { code: "en", short: "EN", label: "English", flag: flagEn.src },
];

export default function LanguageSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selected = languages.find((item) => item.code === value) || languages[0];

  useEffect(() => {
    const close = (event) => !rootRef.current?.contains(event.target) && setOpen(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return (
    <div ref={rootRef} className="language-selector">
      <button className="language-trigger" onClick={() => setOpen((current) => !current)} aria-expanded={open}>
        <Languages /><img className="language-flag" src={selected.flag} alt="" /><strong>{selected.short}</strong><ChevronDown className={open ? "rotated" : ""} />
      </button>
      {open && (
        <div className="language-menu">
          {languages.map((language) => (
            <button key={language.code} className={value === language.code ? "selected" : ""} onClick={() => { onChange(language.code); setOpen(false); }}>
              <span className="language-checkbox">{value === language.code && <Check />}</span>
              <img className="language-flag" src={language.flag} alt="" />
              <span><strong>{language.label}</strong><small>{language.short}</small></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
