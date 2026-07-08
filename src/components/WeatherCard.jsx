import { formatDate, getWeatherByCode } from "../utilities";

function WeatherCard({ currentWeather, isDay, cityName }) {
  const date = formatDate(currentWeather?.time);

  const weatherStatus = getWeatherByCode(currentWeather?.weather_code, isDay);

  const background = isDay
    ? "bg-gradient-to-b from-cyan-300 to-sky-500"
    : "bg-gradient-to-b from-indigo-950 to-slate-900";

  return (
    <div
      className={`w-full ${background} shadow-xl rounded-4xl font-sans text-white p-6`}
    >
      {/* {Header} */}
      <div className="flex flex-col items-center justify-center space-y-6 mb-6 lg:flex-row lg:items-center lg:justify-around">
        <div className="text-7xl drop-shadow-lg lg:order-2">
          {weatherStatus.icon}
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold lg:order-1">{cityName}</h2>
          <p className="text-sky-100 text-sm">{date} (today)</p>
        </div>
      </div>
      {/* {Main Temperature} */}
      <div className="text-center mb-8">
        <p className="text-7xl font-light tracking-tighter">
          {Math.round(currentWeather?.temperature_2m ?? 0)}
          <span className="text-2xl align-super ml-1 font-normal">°</span>
        </p>
        <p className="text-sky-100 text-lg mt-1">{weatherStatus.status}</p>
      </div>
      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-2 text-center border-t border-white/20 pt-6">
        <div>
          <p className="text-xs text-sky-100 uppercase tracking-wider">
            Humidity 💧
          </p>
          <p className="text-xl font-semibold mt-1">
            {currentWeather?.relative_humidity_2m} %
          </p>
        </div>
        <div>
          <p className="text-xs text-sky-100 uppercase tracking-wider">
            Wind 🎐
          </p>
          <p className="text-xl font-semibold mt-1">
            {currentWeather?.wind_speed_10m}{" "}
            <span className="text-sm">(km/h)</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-sky-100 uppercase tracking-wider">
            Feels Like 🌡
          </p>
          <p className="text-xl font-semibold mt-1">
            {Math.round(currentWeather?.apparent_temperature ?? 0)}
            <span className="text-sm align-super ml-1 font-normal">°</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default WeatherCard;
