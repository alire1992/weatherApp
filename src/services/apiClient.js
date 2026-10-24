import {
  BASE_URL_OPEN_METO,
  BASE_URL_OPEN_STREET,
  CARD_OPTIONS,
  OPTIONS,
} from "./apiservices";

export const fetchWeather = async (lat, lon, options = OPTIONS) => {
  const res = await fetch(
    `${BASE_URL_OPEN_METO}latitude=${lat}&longitude=${lon}${options}`,
  );

  if (!res.ok)
    throw new Error(`Failed to fetch weather: ${res.status} ${res.statusText}`);

  const data = await res.json();

  return data;
};

export async function fetchFavoritesWeather(favorites) {
  if (!favorites.length) return [];

  const lats = favorites.map((f) => f.lat).join(",");
  const lons = favorites.map((f) => f.lon).join(",");

  const data = await fetchWeather(lats, lons, CARD_OPTIONS);

  // One location returns an object, several return an array
  return Array.isArray(data) ? data : [data];
}

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
