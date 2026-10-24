import { Link } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";

import { getWeatherByCode } from "../utilities";

const themes = {
  day: "bg-blue-200 text-blue-900 border-blue-100 hover:bg-white",
  night: "bg-slate-900/80 text-blue-100 border-slate-700 hover:bg-slate-800",
};

function FavoriteCard({ favorite, current, onRemove }) {
  const { lat, lon, cityName } = favorite;

  // Each card follows its own city's day/night, not the browser's clock
  const isDay = current ? Number(current.is_day) === 1 : true;
  const weather = current
    ? getWeatherByCode(current.weather_code, isDay)
    : null;

  const href = `/?lat=${lat}&lon=${lon}&cityName=${encodeURIComponent(cityName)}`;

  return (
    <article
      className={`relative rounded-2xl border shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        isDay ? themes.day : themes.night
      }`}
    >
      {/* The whole card is a real link: keyboard, middle-click and
          "open in new tab" all work */}
      <Link
        to={href}
        className="flex flex-col gap-2 rounded-2xl p-4 outline-orange-500 outline-offset-2"
      >
        <h3 className="truncate pr-8 text-lg font-semibold">{cityName}</h3>

        {weather ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">
                {Math.round(current.temperature_2m)}°
              </p>
              <p className="text-sm opacity-80">{weather.status}</p>
            </div>
            <span className="text-5xl" aria-hidden="true">
              {weather.icon}
            </span>
          </div>
        ) : (
          // placeholder while the forecast loads (or if it failed)
          <div className="flex items-center justify-between" role="status">
            <span className="sr-only">Loading weather for {cityName}</span>

            <div className="space-y-2" aria-hidden="true">
              <div className="h-10 w-20 animate-pulse rounded-lg bg-white/30" />
              <div className="h-4 w-24 animate-pulse rounded-lg bg-white/30" />
            </div>

            <div
              className="h-12 w-12 animate-pulse rounded-full bg-white/30"
              aria-hidden="true"
            />
          </div>
        )}
      </Link>

      {/* Outside the Link, so clicking it doesn't also open the city */}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${cityName} from favorites`}
        className="absolute right-2 top-2 cursor-pointer rounded-full p-1.5 text-xl text-red-500 outline-orange-500 transition-colors duration-200 hover:bg-red-500/10"
      >
        <HiXMark />
      </button>
    </article>
  );
}

export default FavoriteCard;
