import { getWeatherByCode, formatHour } from "../utilites";

function HourlyForecast({ hourlyData, isDay }) {
  return (
    <div className="w-full  mx-auto bg-white/10 backdrop-blur-md  p-4 text-white">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-100 mb-4 px-2">
        Hourly Forecast
      </h3>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto space-x-6 pb-2 scrollbar-none overflow-auto">
        {hourlyData?.time.map((time, index) => {
          const weather = getWeatherByCode(
            hourlyData?.precipitation[index],
            isDay,
          );

          return (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 min-w-[60px]"
            >
              <p className="text-xs text-sky-100">
                {index === 0 ? "Now" : formatHour(time)}
              </p>
              <div className="text-2xl">{weather.icon}</div>
              <p className="text-sm font-semibold">
                {Math.round(hourlyData?.temperature_2m[index])}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;
