import { Bot, Home, Images, Info, Mail, Search } from "lucide-react";
import Link from "next/link";
import logo from "../../assets/icons/logo.svg";
import "./SiteRail.css";

export default function SiteRail({ active = "places", mobileOpen = false }) {
  return <aside className={`site-rail ${mobileOpen ? "mobile-open" : ""}`}><Link className="site-rail-logo" href="/" aria-label="MyAzerbaijan"><img className="site-logo" src={logo.src} alt="" /></Link><nav className="site-rail-nav" aria-label="Main navigation"><Link href="/" className={active === "home" ? "active" : ""} title="Home"><Home /></Link><Link href="/#map" title="Map"><Search /></Link><Link href="/places" className={active === "places" ? "active" : ""} title="Places"><Images /></Link><Link href="/#assistant" title="AI"><Bot /></Link><Link href="/about" className={active === "about" ? "active" : ""} title="About"><Info /></Link><Link href="/contact" className={active === "contact" ? "active" : ""} title="Contact"><Mail /></Link></nav></aside>;
}
