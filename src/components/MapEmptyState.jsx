import { FaMapMarkerAlt } from "react-icons/fa";

function MapEmptyState() {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-blue-50/90 p-3 text-blue-700 shadow-md md:flex-col md:p-6 md:text-center">
      <FaMapMarkerAlt className="shrink-0 text-2xl text-orange-500 md:text-4xl" />
      <p className="text-sm font-semibold md:text-base">
        <span className="md:hidden">Tap the map to see the weather there.</span>
        <span className="hidden md:inline">
          Click anywhere on the map, or on a favorite city, to see its current
          weather.
        </span>
      </p>
    </div>
  );
}

export default MapEmptyState;
