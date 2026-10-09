import { FaLocationArrow } from "react-icons/fa";

function LocationButton({ onLocate, isLocating }) {
  return (
    <button
      onClick={onLocate}
      disabled={isLocating}
      aria-label="Use my location"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 font-medium text-slate-800 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white disabled:cursor-wait disabled:opacity-70"
    >
      <FaLocationArrow className={isLocating ? "animate-pulse" : ""} />
      <span className="hidden sm:inline">
        {isLocating ? "Locating..." : "Use my location"}
      </span>
    </button>
  );
}

export default LocationButton;
