const weatherMap = {
  0: {
    icon: "☀️",
    nightIcon: "🌙",
    status: "Sunny",
    nightStatus: "Clear Night",
    description: "Clear sky",
  },
  1: {
    icon: "🌤️",
    nightIcon: "🌙", // Or "☁️🌙" if you want to get creative, but 🌙 is safer
    status: "Partly Cloudy",
    nightStatus: "Partly Cloudy Night",
    description: "Few clouds",
  },
  2: {
    icon: "⛅",
    nightIcon: "☁️", // At night, scattered clouds just look like a dark cloudy sky
    status: "Cloudy",
    description: "Scattered clouds",
  },
  3: { icon: "☁️", status: "Overcast", description: "Broken clouds" },
  45: { icon: "🌫️", status: "Foggy", description: "Fog" },
  48: { icon: "🌫️", status: "Foggy", description: "Depositing rime fog" },
  51: { icon: "🌦️", status: "Light Drizzle", description: "Light drizzle" },
  53: {
    icon: "🌦️",
    status: "Moderate Drizzle",
    description: "Moderate drizzle",
  },
  55: { icon: "🌧️", status: "Heavy Drizzle", description: "Heavy drizzle" },
  61: { icon: "🌧️", status: "Light Rain", description: "Slight rain" },
  63: { icon: "🌧️", status: "Moderate Rain", description: "Moderate rain" },
  65: { icon: "🌧️", status: "Heavy Rain", description: "Heavy rain" },
  71: { icon: "🌨️", status: "Light Snow", description: "Light snow" },
  73: { icon: "🌨️", status: "Moderate Snow", description: "Moderate snow" },
  75: { icon: "❄️", status: "Heavy Snow", description: "Heavy snow" },
  80: {
    icon: "🌦️",
    status: "Rain Showers",
    description: "Slight rain showers",
  },
  95: { icon: "🌩️", status: "Thunderstorm", description: "Thunderstorm" },
  96: {
    icon: "⛈️",
    status: "Severe Thunderstorm",
    description: "Thunderstorm with slight hail",
  },
  99: {
    icon: "⛈️",
    status: "Severe Thunderstorm",
    description: "Thunderstorm with heavy hail",
  },
};

export function formatDate(date) {
  const rawDate = new Date(date);

  if (isNaN(rawDate.getTime())) return "Invalid Date";

  return rawDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  });
}

export const getWeatherByCode = (code, isDay) => {
  const weatherStatus = weatherMap[code] || {
    icon: "❓",
    status: "Unknown",
    description: "Unavailable data",
  };

  return {
    ...weatherStatus,
    icon: isDay
      ? weatherStatus?.icon
      : weatherStatus?.nightIcon || weatherStatus?.icon,
    status: isDay
      ? weatherStatus?.status
      : weatherStatus?.nightStatus || weatherStatus?.status,
  };
};
