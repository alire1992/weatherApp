import { getWeatherByCode, formatHour, formatLocalDateNow } from "../utilities";

function HourlyForecast({ hourlyData, isDay }) {
  const timeNow = formatLocalDateNow();

  const startIndex = Math.max(0, hourlyData?.time.indexOf(timeNow) ?? -1);
  const time = hourlyData?.time.slice(startIndex, startIndex + 24);
  const precipitation = hourlyData?.precipitation.slice(
    startIndex,
    startIndex + 24,
  );
  const temperature = hourlyData?.temperature_2m.slice(
    startIndex,
    startIndex + 24,
  );

  return (
    <div className="w-full rounded-4xl  mx-auto bg-white/10 backdrop-blur-md  p-4 text-white">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-100 mb-4 px-2">
        Hourly Forecast
      </h3>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto space-x-6 pb-2 scrollbar-none overflow-auto">
        {time?.map((hour, index) => {
          const weather = getWeatherByCode(precipitation?.[index], isDay);

          return (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 min-w-[60px]"
            >
              <p className="text-xs text-sky-100">
                {index === 0 ? "Now" : formatHour(hour)}
              </p>
              <div className="text-2xl">{weather.icon}</div>
              <p className="text-sm font-semibold">
                {Math.round(temperature?.[index])}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;
