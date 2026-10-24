import { useQuery } from "@tanstack/react-query";
import { fetchFavoritesWeather } from "../services/apiClient";

// One batched request for all favorites (results keep the same order).
export function useFavoritesWeather(favorites) {
  const lats = favorites.map((f) => f.lat).join(",");
  const lons = favorites.map((f) => f.lon).join(",");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["favoritesWeather", lats, lons],
    queryFn: () => fetchFavoritesWeather(favorites),
    enabled: favorites.length > 0,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  return { data: data ?? [], isLoading, error, refetch };
}
