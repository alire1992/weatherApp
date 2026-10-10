import { useQuery } from "@tanstack/react-query";
import { fetchCityName } from "../apiClient";

export function useCityName({ lat, lon } = {}) {
  const {
    data: cityData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cityName", lat, lon],
    queryFn: () => fetchCityName(lat, lon),
    enabled: !!lat,
    staleTime: Infinity,
    retry: 1,
  });

  return { cityData, isLoading, error };
}
