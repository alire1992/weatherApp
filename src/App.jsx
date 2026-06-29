import DailyForecast from "./components/DailyForecast";
import Header from "./components/Header";
import HourlyForecast from "./components/HourlyForecast";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  // Fake data matching Open-Meteo structure
  const currentWeather = {
    cityName: "Tehran",
    apparent_temperature: 31.5,
    is_day: 1,
    relative_humidity_2m: 11,
    temperature_2m: 34.5,
    time: "2026-06-20T18:45",
    weather_code: 0,
    wind_speed_10m: 5.6,
  };

  const hourlyData = {
    time: [
      "2026-06-20T18:00",
      "2026-06-20T19:00",
      "2026-06-20T20:00",
      "2026-06-20T21:00",
      "2026-06-20T22:00",
      "2026-06-20T23:00",
      "2026-06-21T00:00",
      "2026-06-21T01:00",
    ],
    temperature_2m: [34, 32, 30, 28, 27, 24, 23, 23],
    weather_code: [0, 0, 1, 1, 2, 2, 2, 1],
  };

  const dailyData = {
    time: [
      "2026-06-20",
      "2026-06-21",
      "2026-06-22",
      "2026-06-23",
      "2026-06-24",
    ],
    weather_code: [0, 1, 2, 51, 61],
    temperature_2m_max: [35, 36, 34, 30, 28],
    temperature_2m_min: [25, 26, 24, 22, 20],
  };

  const isDay = Number(currentWeather.is_day) === 1;

  const background = isDay
    ? "bg-gradient-to-b from-cyan-300 to-sky-500"
    : "bg-gradient-to-b from-indigo-950 to-slate-900";
  return (
    <div
      className={`min-h-screen ${background} font-sans p-4 md:p-8 transition-colors duration-500`}
    >
      <header className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
        <Header />
        <SearchBar />
      </header>
      <main>
        <WeatherCard />
        <HourlyForecast hourlyData={hourlyData} isDay={isDay} />
        <DailyForecast dailyData={dailyData} />
      </main>
    </div>
  );
}

export default App;
