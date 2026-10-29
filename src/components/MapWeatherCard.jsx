import { getWeatherByCode } from "../utilities";

function MapWeatherCard({ cityName, currentWeather, isDay }) {
  const weather = getWeatherByCode(currentWeather.weather_code, isDay);

  const theme = isDay
    ? "bg-blue-200 text-blue-900"
    : "bg-slate-900/80 text-blue-100";

  const feelsLike = Math.round(currentWeather.apparent_temperature);

  const stats = [
    { label: "Feels like", value: `${feelsLike}°` },
    { label: "Humidity", value: `${currentWeather.relative_humidity_2m}%` },
    {
      label: "Wind",
      value: `${Math.round(currentWeather.wind_speed_10m)} km/h`,
    },
    { label: "Clouds", value: `${currentWeather.cloud_cover}%` },
  ];

  return (
    <section className={`rounded-2xl p-3 shadow-md md:p-5 ${theme}`}>
      <h2 className="truncate text-base font-semibold md:text-xl">
        {cityName}
      </h2>

      <div className="mt-1 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl md:text-6xl" aria-hidden="true">
            {weather.icon}
          </span>
          <div>
            <p className="text-3xl font-bold md:text-5xl">
              {Math.round(currentWeather.temperature_2m)}°
            </p>
            <p className="text-xs opacity-80 md:text-sm">{weather.status}</p>
          </div>
        </div>

        {/* phones only: the one extra detail that fits */}
        <p className="text-xs opacity-80 md:hidden">Feels {feelsLike}°</p>
      </div>

      {/* md and up: full details */}
      <dl className="mt-4 hidden grid-cols-2 gap-3 md:grid">
        {stats.map(({ label, value }) => (
          <div key={label} className="rounded-xl bg-white/30 p-3">
            <dt className="text-xs opacity-80">{label}</dt>
            <dd className="text-lg font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default MapWeatherCard;
