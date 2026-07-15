import "./WeatherOverlay.css";

const seeded = (seed) => ((seed * 9301 + 49297) % 233280) / 233280;
const rainDrops = Array.from({ length: 90 }, (_, index) => ({
  left: `${seeded(index + 1) * 100}%`,
  animationDelay: `${seeded(index + 101) * 1.7}s`,
  animationDuration: `${0.7 + seeded(index + 201) * 0.65}s`,
  opacity: 0.22 + seeded(index + 301) * 0.45,
}));
const snowFlakes = Array.from({ length: 75 }, (_, index) => ({
  left: `${seeded(index + 401) * 100}%`,
  width: `${4 + seeded(index + 501) * 5}px`,
  height: `${4 + seeded(index + 501) * 5}px`,
  animationDelay: `${seeded(index + 601) * 4}s`,
  animationDuration: `${5 + seeded(index + 701) * 7}s`,
  opacity: 0.35 + seeded(index + 801) * 0.45,
}));
const cloudItems = Array.from({ length: 7 }, (_, index) => ({
  top: `${8 + seeded(index + 901) * 56}%`,
  left: `${-20 + seeded(index + 1001) * 110}%`,
  width: `${180 + seeded(index + 1101) * 260}px`,
  height: `${70 + seeded(index + 1201) * 95}px`,
  animationDelay: `${seeded(index + 1301) * 4}s`,
  animationDuration: `${18 + seeded(index + 1401) * 16}s`,
  opacity: 0.12 + seeded(index + 1501) * 0.18,
}));

export default function WeatherOverlay({ weather }) {
  if (!weather) return null;

  return (
    <div className={`weather-overlay effect-${weather.effect}`}>
      {weather.effect === "rain" && (
        <div className="rain-layer">
          {rainDrops.map((style, index) => (
            <span key={index} style={style} />
          ))}
        </div>
      )}

      {weather.effect === "snow" && (
        <div className="snow-layer">
          {snowFlakes.map((style, index) => (
            <span key={index} style={style} />
          ))}
        </div>
      )}

      {weather.effect === "clouds" && (
        <div className="cloud-map-layer">
          {cloudItems.map((style, index) => (
            <span key={index} style={style} />
          ))}
        </div>
      )}

      {(weather.effect === "rain" || weather.effect === "snow") && (
        <div className="weather-darken" />
      )}
    </div>
  );
}
