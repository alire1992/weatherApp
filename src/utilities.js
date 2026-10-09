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
    nightIcon: "🌙",
    status: "Partly Cloudy",
    nightStatus: "Partly Cloudy Night",
    description: "Few clouds",
  },
  2: {
    icon: "⛅",
    nightIcon: "☁️",
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
  56: {
    icon: "🌧️",
    status: "Freezing Drizzle",
    description: "Light freezing drizzle",
  },
  57: {
    icon: "🌧️",
    status: "Freezing Drizzle",
    description: "Dense freezing drizzle",
  },
  61: { icon: "🌧️", status: "Light Rain", description: "Slight rain" },
  63: { icon: "🌧️", status: "Moderate Rain", description: "Moderate rain" },
  65: { icon: "🌧️", status: "Heavy Rain", description: "Heavy rain" },
  66: {
    icon: "🌧️",
    status: "Freezing Rain",
    description: "Light freezing rain",
  },
  67: {
    icon: "🌧️",
    status: "Freezing Rain",
    description: "Heavy freezing rain",
  },
  71: { icon: "🌨️", status: "Light Snow", description: "Light snow" },
  73: { icon: "🌨️", status: "Moderate Snow", description: "Moderate snow" },
  75: { icon: "❄️", status: "Heavy Snow", description: "Heavy snow" },
  77: { icon: "🌨️", status: "Snow Grains", description: "Snow grains" },
  80: {
    icon: "🌦️",
    status: "Rain Showers",
    description: "Slight rain showers",
  },
  81: {
    icon: "🌦️",
    status: "Rain Showers",
    description: "Moderate rain showers",
  },
  82: {
    icon: "⛈️",
    status: "Violent Showers",
    description: "Violent rain showers",
  },
  85: {
    icon: "🌨️",
    status: "Snow Showers",
    description: "Slight snow showers",
  },
  86: { icon: "❄️", status: "Snow Showers", description: "Heavy snow showers" },
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

// Helper to format "2026-06-20T18:00" to "Saterday, july 20"
export const formatDate = (date) => {
  const rawDate = new Date(date);

  if (isNaN(rawDate.getTime())) return "Invalid Date";

  return rawDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  });
};

// Helper to exchange code(Open Meto) Weather by weather status object
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

// Helper to format "2026-06-20T18:00" to "6 PM"
export const formatHour = (timeString) => {
  return new Date(timeString).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
};

// Helper to format "2026-06-20" to "Mon", "Tue", etc.
export const formatDay = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", { weekday: "short" });
};

// Helper to format timestamp Date.now() "2026-07-25T00:00" (ex)

export const formatLocalDateNow = () => {
  const date = new Date(Date.now());
  date.setMinutes(0, 0, 0);

  const pad = (n) => n.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:00`;
};
