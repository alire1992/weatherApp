import { FaCloudSun, FaSearchLocation } from "react-icons/fa";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 my-12 text-center">
      <div className="relative mb-6">
        <FaCloudSun className="text-8xl text-blue-200/80" />
        <FaSearchLocation className="text-4xl text-blue-300/80 absolute -bottom-2 -right-2" />
      </div>
      <h3 className="text-2xl font-bold text-blue-50 mb-4">
        Ready to check the weather?
      </h3>
      <p className="text-blue-100/90 max-w-md text-lg leading-relaxed">
        Enter a city name in the search bar above to get real-time weather
        information, hourly forecasts, and daily predictions!
      </p>
      <div className="mt-8 flex gap-2 text-blue-200/60 text-sm">
        <span>🌍 Worldwide coverage</span>
        <span>•</span>
        <span>🔄 Real-time data</span>
        <span>•</span>
        <span>📊 7-day forecast</span>
      </div>
    </div>
  );
}

export default EmptyState;
