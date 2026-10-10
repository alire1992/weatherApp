import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../apiClient";

export function useWeather(lat, lon) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat, lon),
    enabled: !!lat,
    staleTime: 10 * 60 * 1000,
  });

  return { data, isLoading, error };
}
