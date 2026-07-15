"use client";

import { motion } from "framer-motion";
import loaderBackground from "../../assets/images/loader_img.jpg";
import "./OpeningLoader.css";

export default function OpeningLoader() {
  return (
    <motion.div className="opening-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5 }}>
      <motion.div className="loader-photo" style={{ backgroundImage: `url(${loaderBackground.src})` }} initial={{ scale: 1.07 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }} />
      <div className="loader-cloud cloud-left">
        <div className="cloud-visual" />
      </div>
      <div className="loader-cloud cloud-right">
        <div className="cloud-visual" />
      </div>
    </motion.div>
  );
}
