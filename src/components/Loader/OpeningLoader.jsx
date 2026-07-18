"use client";

import { motion } from "framer-motion";
import loaderBackground from "../../assets/images/loader_img.jpg";
import logo from "../../assets/icons/logo.svg";
import "./OpeningLoader.css";

export default function OpeningLoader() {
  return (
    <motion.div className="opening-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .38, ease: "easeOut" }}>
      <img className="loader-photo" src={loaderBackground.src} alt="" decoding="async" fetchPriority="high" draggable="false" />
      <div className="loader-shade" />
      <div className="loader-cloud cloud-left" />
      <div className="loader-cloud cloud-right" />
      <div className="loader-brand" role="status" aria-label="MyAzerbaijan yüklənir">
        <div className="loader-mark"><img src={logo.src} alt="" /><span /></div>
        <strong>MyAzerbaijan</strong>
        <small>KƏŞF · PLAN · SƏYAHƏT</small>
        <div className="loader-progress"><i /></div>
      </div>
    </motion.div>
  );
}
