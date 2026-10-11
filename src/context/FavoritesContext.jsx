import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorageState([], "favorites");

  const isFavorite = (lat, lon) =>
    favorites.some((favorite) => favorite.lat === lat && favorite.lon === lon);

  const toggleFavorite = (city) =>
    setFavorites((prev) =>
      prev.some((f) => f.lat === city.lat && f.lon === city.lon)
        ? prev.filter((f) => !(f.lat === city.lat && f.lon === city.lon))
        : [...prev, city],
    );

  return (
    <FavoritesContext.Provider
      value={{ isFavorite, toggleFavorite, favorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === null)
    throw new Error("Use favorites out of favorites provider");

  return context;
}
