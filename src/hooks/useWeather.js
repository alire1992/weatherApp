import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../apiClient";

export function useWeather(lat, lon) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat, lon),
    enabled: !!lat,
  });

  return { data, isLoading, error };
}
