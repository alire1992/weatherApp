// import { useEffect } from "react";

import { formatDate, getWeatherByCode } from "../utilites";

function WeatherCard() {
  //   useEffect(() => {
  //     fetch(
  //       "https://api.open-meteo.com/v1/forecast?latitude=35.72&longitude=51.33&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,precipitation,wind_speed_120m,relative_humidity_2m&current=temperature_2m,is_day,rain,snowfall,showers,precipitation,relative_humidity_2m,apparent_temperature,cloud_cover,wind_speed_10m,weather_code&timezone=auto",
  //     )
  //       .then((res) => res.json())
  //       .then((data) => console.log(data));
  //   }, []);

  // fake data base of data  fetched 👆
  const currentWeather = {
    cityName: "Tehran", //figure out later
    apparent_temperature: 31.5,
    cloud_cover: 0,
    interval: 900,
    is_day: 1,
    precipitation: 0,
    rain: 0,
    relative_humidity_2m: 11,
    showers: 0,
    snowfall: 0,
    temperature_2m: 34.5,
    time: "2026-06-20T18:45",
    weather_code: 0,
    wind_speed_10m: 5.6,
  };

  const date = formatDate(currentWeather.time);
  const isDay = Number(currentWeather.is_day) === 1;

  const weatherStatus = getWeatherByCode(currentWeather.weather_code, isDay);

  const background = isDay
    ? "bg-gradient-to-b from-cyan-300 to-sky-500"
    : "bg-gradient-to-b from-indigo-950 to-slate-900";

  return (
    <div className={`w-full ${background} shadow-xl font-sans text-white p-6`}>
      {/* {Header} */}
      <div className="flex flex-col items-center justify-center space-y-6 mb-6 lg:flex-row lg:items-center lg:justify-around">
        <div className="text-7xl drop-shadow-lg lg:order-2">
          {weatherStatus.icon}
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold lg:order-1">
            {currentWeather?.cityName}
          </h2>
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
