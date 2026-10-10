export const BASE_URL_OPEN_METO = "https://api.open-meteo.com/v1/forecast?";
export const BASE_URL_BCD =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";
export const OPTIONS =
  "&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&hourly=temperature_2m,precipitation,wind_speed_120m,relative_humidity_2m&current=temperature_2m,is_day,rain,snowfall,showers,precipitation,relative_humidity_2m,apparent_temperature,cloud_cover,wind_speed_10m,weather_code&timezone=auto";

export const fetchWeather = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL_OPEN_METO}latitude=${lat}&longitude=${lon}${OPTIONS}`,
  );

  if (!res.ok)
    throw new Error(`Failed to fetch weather: ${res.status} ${res.statusText}`);

  const data = await res.json();

  return data;
};

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

export const fetchCityName = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL_OPEN_STREET}/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10&accept-language=en`,
  );

  if (!res.ok)
    throw new Error(
      `Failed to fetch City Name: ${res.status} ${res.statusText}`,
    );

  const data = await res.json();

  // Return a small, API-independent shape: useCityName / App only need `name`
  return {
    name: data.name || data.locality || data.principalSubdivision || null,
  };
};
