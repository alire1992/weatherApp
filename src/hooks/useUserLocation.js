import { useState, useCallback } from "react";

export function useUserLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState(null);

  const getPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation.");
      return;
    }

    setIsLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        const messages = {
          1: "Location permission was denied. Allow it in your browser settings or search for a city.",
          2: "Your location is unavailable. Try again or search for a city.",
          3: "Getting your location took too long. Try again or search for a city.",
        };
        setError(messages[err.code] || err.message);
        setIsLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  }, []);

  return { position, isLoading, error, getPosition };
}
