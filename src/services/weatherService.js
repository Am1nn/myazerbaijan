const WEATHER_API_BASE = "https://api.open-meteo.com/v1/forecast";

const FORCE_RAIN_TEST = true;

const WEATHER_GROUPS = {
  clear: [0],
  clouds: [1, 2, 3, 45, 48],
  rain: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99],
  snow: [71, 73, 75, 77, 85, 86],
};

function getWeatherEffect(current) {
  if (FORCE_RAIN_TEST) return "rain";

  const code = current?.weather_code;
  const precipitation = current?.precipitation ?? 0;
  const rain = current?.rain ?? 0;
  const showers = current?.showers ?? 0;
  const snowfall = current?.snowfall ?? 0;

  if (snowfall > 0 || WEATHER_GROUPS.snow.includes(code)) return "snow";

  if (
    precipitation > 0 ||
    rain > 0 ||
    showers > 0 ||
    WEATHER_GROUPS.rain.includes(code)
  ) {
    return "rain";
  }

  if (WEATHER_GROUPS.clouds.includes(code)) return "clouds";

  return "clear";
}

function getWeatherLabel(code, lang = "az") {
  if (FORCE_RAIN_TEST) {
    return lang === "az" ? "Test yağışı" : "Test rain";
  }

  const labels = {
    az: {
      0: "Açıq səma",
      1: "Əsasən açıq",
      2: "Qismən buludlu",
      3: "Buludlu",
      45: "Duman",
      48: "Qırovlu duman",
      51: "Yüngül çiskin",
      53: "Çiskin",
      55: "Güclü çiskin",
      61: "Yüngül yağış",
      63: "Yağış",
      65: "Güclü yağış",
      71: "Yüngül qar",
      73: "Qar",
      75: "Güclü qar",
      80: "Qısa yağış",
      81: "Güclü qısa yağış",
      82: "Çox güclü yağış",
      95: "Şimşəkli hava",
      96: "Şimşəkli və dolulu",
      99: "Güclü şimşəkli hava",
    },
    en: {
      0: "Clear sky",
      1: "Mostly clear",
      2: "Partly cloudy",
      3: "Cloudy",
      45: "Fog",
      48: "Rime fog",
      51: "Light drizzle",
      53: "Drizzle",
      55: "Dense drizzle",
      61: "Light rain",
      63: "Rain",
      65: "Heavy rain",
      71: "Light snow",
      73: "Snow",
      75: "Heavy snow",
      80: "Rain showers",
      81: "Heavy showers",
      82: "Violent showers",
      95: "Thunderstorm",
      96: "Thunderstorm with hail",
      99: "Heavy thunderstorm",
    },
  };

  return labels[lang]?.[code] || labels.en[code] || "Weather";
}

export async function getWeatherByCoords({ lat, lng, lang = "az" }) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lng,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,is_day",
    timezone: "auto",
  });

  const response = await fetch(`${WEATHER_API_BASE}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Weather data could not be loaded.");
  }

  const data = await response.json();
  const current = data.current;

  return {
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),

    precipitation: FORCE_RAIN_TEST ? 5 : current.precipitation,
    rain: FORCE_RAIN_TEST ? 5 : current.rain,
    snowfall: FORCE_RAIN_TEST ? 0 : current.snowfall,

    isDay: current.is_day === 1,
    code: FORCE_RAIN_TEST ? 63 : current.weather_code,
    label: getWeatherLabel(current.weather_code, lang),
    effect: getWeatherEffect(current),

    lat,
    lng,
  };
}