import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";
import WeatherCard from "../components/WeatherCard";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import { useWeather } from "../hooks/useWeather";
import { useCitySearch } from "../hooks/useCitySearch";
import { useCityName } from "../hooks/useCityName";

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

  const {
    data: geoData = [],
    isLoading: isGeoLoading,
    error: geoError,
  } = useCitySearch(searchCity);

  const { lat, lon, name: cityName } = geoData.at(0) || {};

  const coords = usingMyLocation ? position : { lat, lon };

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
    refetch,
  } = useWeather(coords.lat, coords.lon);

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
  const { cityData } = useCityName(usingMyLocation ? position : {});

  const title = usingMyLocation ? cityData?.name || "Your location" : cityName;

  const isLoading = isGeoLoading || isWeatherLoading || isLocating;
  const error =
    (source === "location" ? locationError : geoError) || weatherError;

  if (isLoading) return <Loader />;

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
