import { getWeatherByCode, formatDay } from "../utilites";

function DailyForecast({ dailyData }) {
  return (
    <div className="w-full  mx-auto bg-white/10 backdrop-blur-md  p-4 text-white">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-100 mb-4 px-2">
        7-Day Forecast
      </h3>

      <div className="divide-y divide-white/10">
        {dailyData?.time.map((day, index) => {
          const weather = getWeatherByCode(dailyData?.weather_code[index]);

          return (
            <div
              key={index}
              className="flex items-center justify-between py-3 px-2"
            >
              {/* Day Name */}
              <p className="text-sm font-medium w-12">
                {index === 0 ? "Today" : formatDay(day)}
              </p>

              {/* Icon */}
              <div className="text-2xl mx-4">{weather.icon}</div>

              {/* Status (Hidden on very small screens to save space) */}
              <p className="text-xs text-sky-100 flex-1 hidden sm:block">
                {weather.status}
              </p>

              {/* Min / Max Temps */}
              <div className="flex space-x-3 text-sm">
                <span className="text-sky-200">
                  {Math.round(dailyData?.temperature_2m_min[index])}°
                </span>
                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-400 to-orange-400 mt-2 hidden sm:block"></div>
                <span className="font-semibold">
                  {Math.round(dailyData?.temperature_2m_max[index])}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DailyForecast;
