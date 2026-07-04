import { useQuery } from "@tanstack/react-query";
import { fetchGeoLoaction } from "../apiClient";

export function useGeoLocation(cityName) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cityCoords", cityName],
    queryFn: () => fetchGeoLoaction(cityName),
    enabled: !!cityName,
  });

  return { data, isLoading, error };
}
