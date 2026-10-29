import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorageState([], "favorites");

  const isFavorite = (cityName) => {
    console.log(cityName);
    return favorites.some((favorite) => favorite.cityName === cityName);
  };

  const toggleFavorite = (city) =>
    setFavorites((prev) =>
      prev.some((f) => f.cityName === city.cityName)
        ? prev.filter((f) => !(f.cityName === city.cityName))
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
