import { useState } from "react";

import { useGeoLocation } from "./hooks/useGeoLocation";
import { useWeather } from "./hooks/useWeather";

import DailyForecast from "./components/DailyForecast";
import Header from "./components/Header";
import HourlyForecast from "./components/HourlyForecast";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import EmptyState from "./components/EmptyState";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [searchCity, setSearchCity] = useState("");

  const {
    data: geoData = [],
    isLoading: isGeoLoading,
    error: geoError,
  } = useGeoLocation(searchCity);

  const { lat, lon, name: cityName } = geoData.at(0) || {};

  const {
    data: weatherData,
    isLoading: isWethLoading,
    error: wethError,
  } = useWeather(lat, lon);

  const {
    current: currentWeather,
    hourly: hourlyData,
    daily: dailyData,
  } = weatherData || {};

  const isDay = Number(currentWeather?.is_day) === 1;

  const background = isDay
    ? "bg-gradient-to-b from-cyan-300 to-sky-500"
    : "bg-gradient-to-b from-indigo-950 to-slate-900";

  return (
    <div
      className={`min-h-screen ${background} font-sans p-4 md:p-8 transition-colors duration-500`}
    >
      <header className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
        <Header />
        <SearchBar onSearch={setSearchCity} />
      </header>
      <main>
        {!searchCity && <EmptyState />}
        {(isGeoLoading || isWethLoading) && <Loader />}
        {(geoError || wethError) && <ErrorMessage />}

        {searchCity && currentWeather && !geoError && !wethError && (
          <>
            <WeatherCard
              currentWeather={currentWeather}
              isDay={isDay}
              cityName={cityName}
            />
            <HourlyForecast hourlyData={hourlyData} isDay={isDay} />
            <DailyForecast dailyData={dailyData} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
