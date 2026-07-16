import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { INITIAL_VIEW, MAPBOX_TOKEN, getMapStyle, getLightPreset } from "./MapConfig";
import "./Map.css";

mapboxgl.accessToken = MAPBOX_TOKEN;

const mapErrorText = {
  az: "Xəritə hazırda yüklənə bilmir. Zəhmət olmasa bir az sonra yenidən yoxlayın.",
  tr: "Harita şu anda yüklenemiyor. Lütfen kısa bir süre sonra tekrar deneyin.",
  en: "The map cannot be loaded right now. Please try again shortly.",
  ru: "Карта сейчас не загружается. Пожалуйста, повторите попытку позже.",
};

const centerControlLabel = {
  az: "İçərişəhərə qayıt",
  tr: "İçerişehir'e dön",
  en: "Return to the Old City",
  ru: "Вернуться в Ичери-шехер",
};

class CenterControl {
  constructor(label) {
    this.label = label;
  }

  onAdd(map) {
    this.map = map;
    this.placeholder = document.createElement("div");
    this.placeholder.className = "map-center-control-placeholder";

    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.className = "map-center-button";
    this.button.setAttribute("aria-label", this.label);
    this.button.title = this.label;
    this.button.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="6.25"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/></svg>';
    this.button.addEventListener("click", this.handleClick);
    const navigationGroup = map.getContainer().querySelector(".mapboxgl-ctrl-top-right .mapboxgl-ctrl-group");
    navigationGroup?.appendChild(this.button);
    return this.placeholder;
  }

  handleClick = () => {
    this.map?.easeTo({ ...INITIAL_VIEW, duration: 900, essential: true });
  };

  onRemove() {
    this.button?.removeEventListener("click", this.handleClick);
    this.button?.remove();
    this.placeholder?.remove();
    this.map = undefined;
  }
}

export default function Map({ places, lang, selectedPlace, onSelectPlace, theme }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const styleRef = useRef(getMapStyle(theme));
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map;
    try {
      map = new mapboxgl.Map({
        container: containerRef.current,
        style: styleRef.current,
        center: INITIAL_VIEW.center,
        zoom: INITIAL_VIEW.zoom,
        pitch: INITIAL_VIEW.pitch,
        bearing: INITIAL_VIEW.bearing,
        antialias: true,
        // Mobile users should be able to pan in every direction with one finger.
        cooperativeGestures: false,
        dragPan: true,
        touchZoomRotate: true,
        config: {
          basemap: {
            lightPreset: getLightPreset(styleRef.current === getMapStyle("dark") ? "dark" : "light"),
            showPointOfInterestLabels: false,
            showTransitLabels: false,
            showRoadLabels: true,
            show3dObjects: true,
          },
        },
      });
    } catch (error) {
      console.error("Map initialization failed:", error);
      queueMicrotask(() => setMapError(true));
      return undefined;
    }

    mapRef.current = map;

    // Accidental rotation makes one-finger mobile panning feel unstable. Pinch
    // zoom remains available while the map keeps its current bearing.
    map.touchZoomRotate.disableRotation();

    try {
      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");
      map.addControl(new CenterControl(centerControlLabel[lang] ?? centerControlLabel.en), "top-right");
    } catch (error) {
      console.warn("Map navigation controls could not be added:", error);
    }

    map.on("error", (event) => {
      const message = event?.error?.message || "";
      if (/access token|required|unauthorized|401|403/i.test(message)) {
        console.error("Map authorization failed:", event.error);
        setMapError(true);
      }
    });

    map.on("style.load", () => {
      try {
        map.setConfigProperty("basemap", "lightPreset", getLightPreset(styleRef.current === getMapStyle("dark") ? "dark" : "light"));
        map.setConfigProperty("basemap", "showPointOfInterestLabels", false);
        map.setConfigProperty("basemap", "showTransitLabels", false);
        map.setConfigProperty("basemap", "showRoadLabels", true);
        map.setConfigProperty("basemap", "show3dObjects", true);
      } catch (error) {
        console.warn("Mapbox config warning:", error);
      }
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [lang]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const nextStyle = getMapStyle(theme);
    if (styleRef.current === nextStyle) return;
    styleRef.current = nextStyle;
    map.setStyle(nextStyle, { diff: true });
  }, [theme]);

  useEffect(() => {
    if (!containerRef.current || !mapRef.current) return;
    const observer = new ResizeObserver(() => mapRef.current?.resize());
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = places.map((place) => {
      const root = document.createElement("div");
      root.className = "place-marker-anchor";
      root.style.zIndex = selectedPlace?.id === place.id ? "20" : "5";

      const button = document.createElement("button");
      button.type = "button";
      button.className = `place-marker ${selectedPlace?.id === place.id ? "is-selected" : ""}`;
      button.setAttribute("aria-label", `${place.name[lang]}, ${place.city[lang]}`);
      button.innerHTML = `
        <span class="place-marker-shape"><i></i></span>
        <span class="place-marker-label">
          <strong>${place.name[lang]}</strong>
          <small>${place.city[lang]}</small>
        </span>
      `;
      button.addEventListener("click", () => onSelectPlace(place));
      root.appendChild(button);

      return new mapboxgl.Marker({
        element: root,
        anchor: "bottom",
        // The visual pin tip sits four pixels above the marker box bottom.
        // Compensate so the tip, not the box, lands on the exact coordinate.
        offset: [0, 4],
        pitchAlignment: "viewport",
        rotationAlignment: "viewport",
        occludedOpacity: 1,
        subpixelPositioning: true,
      }).setLngLat(place.coordinates).addTo(map);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, [places, lang, selectedPlace, onSelectPlace]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedPlace) return;
    map.flyTo({
      center: selectedPlace.coordinates,
      zoom: 16.35,
      pitch: 46,
      bearing: -12,
      duration: 1050,
      essential: true,
    });
  }, [selectedPlace]);

  return (
    <>
      <div ref={containerRef} className={`mapbox-container mapbox-${theme}`} />
      {mapError && <div className="mapbox-error" role="status"><span>{mapErrorText[lang] ?? mapErrorText.en}</span></div>}
    </>
  );
}
