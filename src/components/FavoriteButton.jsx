import { FaHeart, FaRegHeart } from "react-icons/fa";

function FavoriteButton({ name, onClick, isFavorite = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isFavorite}
      aria-label={
        isFavorite
          ? `Remove ${name} from favorites`
          : `Add ${name} to favorites`
      }
      className={`fixed bottom-24 left-4 z-1100 flex h-12 min-w-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-white/90 px-3 font-medium ${isFavorite ? "text-orange-500" : "black"} shadow-lg ${isFavorite ? "outline-orange-500" : "outline-black"} outline-offset-2 backdrop-blur transition hover:scale-105 hover:bg-white sm:px-5 lg:bottom-6 lg:left-6`}
    >
      {isFavorite ? (
        <FaHeart className="text-xl" />
      ) : (
        <FaRegHeart className="text-xl" />
      )}
      <span className="hidden sm:inline">{isFavorite ? "Remove" : "Save"}</span>
    </button>
  );
}

export default FavoriteButton;
