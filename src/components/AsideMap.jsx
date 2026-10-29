import { useNavigate } from "react-router-dom";

import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import MapEmptyState from "./MapEmptyState";
import MapWeatherCard from "./MapWeatherCard";
import { useFavorites } from "../context/FavoritesContext";

function AsideMap({
  selected,
  currentWeather,
  isLoading,
  cityName, // real name only (favorite name or reverse geocoding), may be undefined
  error,
  retryFn,
}) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (error) return <ErrorMessage message={error.message} onRetry={retryFn} />;

  // small skeleton, so the panel doesn't jump or fill a phone screen
  if (isLoading)
    return (
      <div
        role="status"
        className="h-24 animate-pulse rounded-2xl bg-white/30 md:h-72"
      >
        <span className="sr-only">Loading weather</span>
      </div>
    );

  if (!selected || !currentWeather) return <MapEmptyState />;

  const isDay = Number(currentWeather.is_day) === 1;

  // Nominatim has no name for oceans or empty areas, so fall back gracefully
  const title = cityName || "Selected location";

  const href = `/?lat=${selected.lat}&lon=${selected.lon}&cityName=${encodeURIComponent(title)}`;
  const saved = isFavorite(cityName);

  return (
    <div className="flex flex-col">
      <MapWeatherCard
        cityName={title}
        currentWeather={currentWeather}
        isDay={isDay}
      />

      <div className="mt-2 flex items-center justify-center gap-2">
        <Button onClick={() => navigate(href)}>See full detail</Button>

        <Button
          variant={saved ? "danger" : "accent"}
          // only places with a real name can be saved
          disabled={!cityName}
          onClick={() =>
            toggleFavorite({ lat: selected.lat, lon: selected.lon, cityName })
          }
        >
          {saved ? "Remove favorite" : "Add to favorite"}
        </Button>
      </div>
    </div>
  );
}

export default AsideMap;
