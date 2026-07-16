import maidenTower1 from "../assets/places/Qız-Qalası/QızQalası(2).png";
import maidenTower2 from "../assets/places/Qız-Qalası/QızQalası(3).png";
import maidenTower3 from "../assets/places/Qız-Qalası/QızQalası(1).png";
import shirvanshahsPalace1 from "../assets/places/Şirvanşahlar-Sarayı/ŞirvanşahlarSarayı(2).png";
import shirvanshahsPalace2 from "../assets/places/Şirvanşahlar-Sarayı/ŞirvanşahlarSarayı(1).png";
import shirvanshahsPalace3 from "../assets/places/Şirvanşahlar-Sarayı/ŞirvanşahlarSarayı(3).png";
import ateshgah1 from "../assets/places/Atəşgah/Atəşgah(2).png";
import ateshgah2 from "../assets/places/Atəşgah/Atəşgah(1).png";
import ateshgah3 from "../assets/places/Atəşgah/Atəşgah(3).png";
import gobustan1 from "../assets/places/Qobustan/Qobustan(3).png";
import gobustan2 from "../assets/places/Qobustan/Qobustan(2).png";
import gobustan3 from "../assets/places/Qobustan/Qobustan(1).png";
import oldCity1 from "../assets/places/İçərişəhər/İçərişəhər(3).jpg";
import oldCity2 from "../assets/places/İçərişəhər/İçərişəhər(2).jpg";
import oldCity3 from "../assets/places/İçərişəhər/İçərişəhər(1).jpg";
import muhammadMosque1 from "../assets/places/Məhəmməd-Məscidi/MəhəmmədMəscidi(1).jpg";
import muhammadMosque2 from "../assets/places/Məhəmməd-Məscidi/MəhəmmədMəscidi(2).jpg";
import muhammadMosque3 from "../assets/places/Məhəmməd-Məscidi/MəhəmmədMəscidi(3).jpg";
import jumaMosque1 from "../assets/places/Cümə-məscidi/CüməMəscidi(1).jpg";
import jumaMosque2 from "../assets/places/Cümə-məscidi/CüməMəscidi(2).jpg";
import jumaMosque3 from "../assets/places/Cümə-məscidi/CüməMəscidi(3).jpg";
import multaniCaravanserai1 from "../assets/places/Multanı-Karvansarası/MultanıKarvansarası(1).jpg";
import multaniCaravanserai2 from "../assets/places/Multanı-Karvansarası/MultanıKarvansarası(2).jpg";
import multaniCaravanserai3 from "../assets/places/Multanı-Karvansarası/MultanıKarvansarası(3).jpg";
import bukharaCaravanserai1 from "../assets/places/Buxara-Karvansarası/BuxaraKarvansarası(1).jpg";
import bukharaCaravanserai2 from "../assets/places/Buxara-Karvansarası/BuxaraKarvansarası(2).jpg";
import bukharaCaravanserai3 from "../assets/places/Buxara-Karvansarası/BuxaraKarvansarası(3).jpg";
import placeFallback from "../assets/images/azerbaijan-loader.jpg";

export const placeMedia = {
  1: [
    maidenTower1.src,
    maidenTower2.src,
    maidenTower3.src,
  ],
  2: [
    shirvanshahsPalace1.src,
    shirvanshahsPalace2.src,
    shirvanshahsPalace3.src,
  ],
  3: [
    ateshgah1.src,
    ateshgah2.src,
    ateshgah3.src,
  ],
  4: [
    gobustan1.src,
    gobustan2.src,
    gobustan3.src,
  ],
  5: [
    oldCity1.src,
    oldCity2.src,
    oldCity3.src,
  ],
  6: [
    muhammadMosque1.src,
    muhammadMosque2.src,
    muhammadMosque3.src,
  ],
  7: [
    jumaMosque1.src,
    jumaMosque2.src,
    jumaMosque3.src,
  ],
  8: [
    multaniCaravanserai1.src,
    multaniCaravanserai2.src,
    multaniCaravanserai3.src,
  ],
  9: [
    bukharaCaravanserai1.src,
    bukharaCaravanserai2.src,
    bukharaCaravanserai3.src,
  ],
};

export const getPlaceImages = (placeId) => placeMedia[placeId] ?? [placeFallback.src];
export const getPlaceImage = (placeId) => getPlaceImages(placeId)[0];
