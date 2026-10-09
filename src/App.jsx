import { useState } from "react";

import { useCitySearch } from "./hooks/useCitySearch";
import { useWeather } from "./hooks/useWeather";
import { useUserLocation } from "./hooks/useUserLocation";

import DailyForecast from "./components/DailyForecast";
import Header from "./components/Header";
import HourlyForecast from "./components/HourlyForecast";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import EmptyState from "./components/EmptyState";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import LocationButton from "./components/LocationButton";

function App() {
  const [searchCity, setSearchCity] = useState("");
  const [source, setSource] = useState("search"); // "search" | "location"

  const {
    position,
    isLoading: isLocating,
    error: locationError,
    getPosition,
  } = useUserLocation();

  const {
    data: geoData = [],
    isLoading: isGeoLoading,
    error: geoError,
  } = useCitySearch(searchCity);

  const { lat, lon, name: cityName } = geoData.at(0) || {};

  // Decide which coordinates the weather query uses
  const usingMyLocation = source === "location" && !!position;
  const coords = usingMyLocation ? position : { lat, lon };
  const title = usingMyLocation ? "Your location" : cityName;

  // Must come AFTER `coords` is calculated
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useWeather(coords.lat, coords.lon);

  const {
    current: currentWeather,
    hourly: hourlyData,
    daily: dailyData,
  } = weatherData || {};

  const handleSearch = (city) => {
    setSource("search");
    setSearchCity(city);
  };

  const handleLocate = () => {
    setSource("location");
    getPosition();
  };

  // Default to day until data arrives, so the background doesn't flash dark
  const isDay = currentWeather ? Number(currentWeather.is_day) === 1 : true;

  const background = isDay
    ? "bg-gradient-to-b from-cyan-300 to-sky-500"
    : "bg-gradient-to-b from-indigo-950 to-slate-900";

  const isLoading = isGeoLoading || isWeatherLoading || isLocating;
  const error =
    (source === "location" ? locationError : geoError) || weatherError;

  // Show exactly one state at a time
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    content = <ErrorMessage message={error.message || String(error)} />;
  } else if (currentWeather) {
    content = (
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
  } else {
    content = <EmptyState />;
  }

  return (
    <div
      className={`min-h-screen ${background} font-sans p-4 md:p-8 transition-colors duration-500`}
    >
      <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between mb-8">
        <Header />
        <SearchBar onSearch={handleSearch} />
      </div>

      <main>{content}</main>

      {/* Floating button: only when my location is not already shown */}
      {!usingMyLocation && (
        <LocationButton onLocate={handleLocate} isLocating={isLocating} />
      )}
    </div>
  );
}

export default App;
