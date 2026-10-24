import FavoriteCard from "../components/FavoriteCard";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

import { useFavorites } from "../context/FavoritesContext";
import { useFavoritesWeather } from "../hooks/useFavoritesWeather";

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { data, error, refetch } = useFavoritesWeather(favorites);

  if (favorites.length === 0) {
    return (
      <EmptyState message="No favorite cities yet. Search a city and tap the heart to save it." />
    );
  }

  return (
    <main className="mx-auto max-w-4xl mt-6">
      {error && <ErrorMessage message={error.message} onRetry={refetch} />}

      {/* Cards show right away from saved data; the forecast fills in after */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((fav, i) => (
          <FavoriteCard
            key={`${fav.lat},${fav.lon}`}
            favorite={fav}
            current={data[i]?.current}
            onRemove={() => toggleFavorite(fav)}
          />
        ))}
      </div>
    </main>
  );
}

export default Favorites;
