import { useSearchParams } from "react-router-dom";

import WeatherMap from "../components/WeatherMap";
import AsideMap from "../components/AsideMap";
import { useCityName } from "../hooks/useCityName";
import { useWeather } from "../hooks/useWeather";
import { useFavoritesWeather } from "../hooks/useFavoritesWeather";
import { useFavorites } from "../context/FavoritesContext";

function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useFavorites();

  // Validate the URL values, so a broken link like ?lat=abc is ignored
  const rawLat = searchParams.get("lat");
  const rawLon = searchParams.get("lon");
  const selected =
    rawLat &&
    rawLon &&
    Number.isFinite(Number(rawLat)) &&
    Number.isFinite(Number(rawLon))
      ? {
          lat: Number(rawLat),
          lon: Number(rawLon),
          // present when a favorite marker was clicked
          cityName: searchParams.get("cityName"),
        }
      : null;

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
    refetch,
  } = useWeather(selected?.lat, selected?.lon);

  const { current: currentWeather } = weatherData || {};

  // Weather for every favorite marker (one batched request, shared cache)
  const { data: favoritesWeather } = useFavoritesWeather(favorites);

  // Only look up a name when the URL doesn't already have one.
  // Not part of the loader/error: the title just fills in when ready.
  const { cityData } = useCityName(
    selected && !selected.cityName ? selected : {},
  );
  const cityName = selected?.cityName || cityData?.name;

  // 4 decimals is about 10 m: precise enough, and the URL stays short.
  // replace: true keeps every click from adding a history entry.
  function handleSelect({ lat, lon, cityName }) {
    const params = { lat: Number(lat).toFixed(4), lon: Number(lon).toFixed(4) };
    if (cityName) params.cityName = cityName;
    setSearchParams(params, { replace: true });
  }

  return (
    <div className="grid h-[70dvh] mt-2 grid-cols-1 grid-rows-[auto_1fr] gap-4 md:grid-cols-[340px_1fr] md:grid-rows-1">
      <aside className="flex max-h-[45vh] min-h-0 flex-col gap-4 overflow-y-auto md:max-h-none md:overflow-visible">
        <AsideMap
          selected={selected}
          currentWeather={currentWeather}
          cityName={cityName}
          isLoading={isWeatherLoading}
          error={weatherError}
          retryFn={refetch}
        />
      </aside>

      <main className="min-h-0 overflow-hidden rounded-2xl shadow-lg">
        <WeatherMap
          selected={selected}
          onSelect={handleSelect}
          favorites={favorites}
          favoritesWeather={favoritesWeather}
        />
      </main>
    </div>
  );
}

export default MapPage;
