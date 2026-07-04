// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&hourly=temperature_2m,precipitation,wind_speed_120m,relative_humidity_2m&current=temperature_2m,is_day,rain,snowfall,showers,precipitation,relative_humidity_2m,apparent_temperature,cloud_cover,wind_speed_10m,weather_code&timezone=auto
export const BASE_URL_OPEN_METO = "https://api.open-meteo.com/v1/forecast?";
export const OPTIONS =
  "&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&hourly=temperature_2m,precipitation,wind_speed_120m,relative_humidity_2m&current=temperature_2m,is_day,rain,snowfall,showers,precipitation,relative_humidity_2m,apparent_temperature,cloud_cover,wind_speed_10m,weather_code&timezone=auto";

// https://nominatim.openstreetmap.org/search?q=London&format=json&limit=1

export const BASE_URL_OPEN_STREET = "https://nominatim.openstreetmap.org";

export const fetchGeoLoaction = async (cityName) => {
  const res = await fetch(
    `${BASE_URL_OPEN_STREET}/search?q=${cityName}&format=json&limit=1`,
    {
      headers: {
        "User-Agent": `WeatherApp/1.0 ${import.meta.env.VITE_USERNAME}`,
      },
    },
  );

  if (!res.ok)
    throw new Error(
      `Failed to fetch location: ${res.status} ${res.statusText}`,
    );

  const data = await res.json();

  return data;
};
