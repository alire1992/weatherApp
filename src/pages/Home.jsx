import { useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";
import WeatherCard from "../components/WeatherCard";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import FavoriteButton from "../components/FavoriteButton";

import { useWeather } from "../hooks/useWeather";
import { useCitySearch } from "../hooks/useCitySearch";
import { useCityName } from "../hooks/useCityName";
import { useFavorites } from "../context/FavoritesContext";

function Home() {
  const {
    searchCity,
    source,
    position,
    usingMyLocation,
    isLocating,
    locationError,
    setIsDay,
  } = useOutletContext();

  const [searchParams] = useSearchParams();

  const {
    data: geoData = [],
    isLoading: isGeoLoading,
    error: geoError,
  } = useCitySearch(searchCity);

  const { lat, lon, name: searchedName } = geoData.at(0) || {};

  // 1) A city opened from a favorite card (?lat=..&lon=..&cityName=..).
  //    Numbers are validated, so a broken link like ?lat=abc is ignored.
  const rawLat = searchParams.get("lat");
  const rawLon = searchParams.get("lon");
  const fromUrl =
    rawLat &&
    rawLon &&
    Number.isFinite(Number(rawLat)) &&
    Number.isFinite(Number(rawLon))
      ? {
          lat: Number(rawLat),
          lon: Number(rawLon),
          cityName: searchParams.get("cityName"),
        }
      : null;

  // 2) My location   3) The searched city
  // The URL wins, so clicking a favorite always shows that city.
  const showingMyLocation = !fromUrl && usingMyLocation;
  const coords = fromUrl ?? (showingMyLocation ? position : { lat, lon });

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
    refetch,
  } = useWeather(coords.lat, coords.lon);

  const { isFavorite, toggleFavorite } = useFavorites();

  const {
    current: currentWeather,
    hourly: hourlyData,
    daily: dailyData,
  } = weatherData || {};

  // Default to day until data arrives, so the background doesn't flash dark
  const isDay = currentWeather ? Number(currentWeather.is_day) === 1 : true;

  // Tell the layout, so the background follows the weather
  useEffect(() => {
    setIsDay(isDay);
  }, [isDay, setIsDay]);

  // Only used for the title, so it is not part of the page loader/error
  const { cityData } = useCityName(showingMyLocation ? position : {});

  // Only offer "save" when we have a real city name and valid coordinates
  const hasName = fromUrl
    ? !!fromUrl.cityName
    : showingMyLocation
      ? !!cityData?.name
      : !!searchedName;
  const canFavorite = hasName && coords.lat != null && coords.lon != null;

  const isLoading = isGeoLoading || isWeatherLoading || isLocating;
  const error =
    (source === "location" ? locationError : geoError) || weatherError;

  function handleFavorite() {
    toggleFavorite({ lat: coords.lat, lon: coords.lon, cityName: title });
  }

  if (isLoading) return <Loader />;

  const title = fromUrl
    ? fromUrl.cityName
    : showingMyLocation
      ? cityData?.name || "Your location"
      : searchedName;

  if (error)
    return (
      <ErrorMessage
        message={error.message || String(error)}
        onRetry={weatherError ? refetch : undefined}
      />
    );

  if (!currentWeather) return <EmptyState />;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {canFavorite && (
        <FavoriteButton
          name={title}
          onClick={handleFavorite}
          isFavorite={isFavorite(coords.lat, coords.lon)}
        />
      )}

      <WeatherCard
        currentWeather={currentWeather}
        isDay={isDay}
        cityName={title}
      />
      <HourlyForecast hourlyData={hourlyData} isDay={isDay} />
      <DailyForecast dailyData={dailyData} />
    </div>
  );
}

export default Home;
