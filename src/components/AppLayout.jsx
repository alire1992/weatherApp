import { useState } from "react";
import Header from "./Header";
import PageShell from "./PageShell";
import SearchBar from "./SearchBar";
import { useUserLocation } from "../hooks/useUserLocation";
import LocationButton from "./LocationButton";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const [searchCity, setSearchCity] = useState("");
  const [source, setSource] = useState("search"); // "search" | "location"
  const [isDay, setIsDay] = useState(true); // Home updates this

  const {
    position,
    isLoading: isLocating,
    error: locationError,
    getPosition,
  } = useUserLocation();

  const usingMyLocation = source === "location" && !!position;

  // Searching or locating from any page takes you to the weather on Home.
  // navigate("/") also clears any ?lat=...&lon=... left by a favorite card.
  const handleSearch = (city) => {
    setSource("search");
    setSearchCity(city);
    // navigate("/");
  };

  const handleLocate = () => {
    setSource("location");
    getPosition();
    // navigate("/");
  };

  // Hide the button only when my location is already on screen
  //   const showLocationButton = !(usingMyLocation && pathname === "/");

  return (
    <PageShell isDay={isDay}>
      <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between mb-8">
        <Header />
        <SearchBar onSearch={handleSearch} />
      </div>
      <Outlet
        context={{
          searchCity,
          source,
          position,
          usingMyLocation,
          isLocating,
          locationError,
          setIsDay,
        }}
      />
      {!usingMyLocation && (
        <LocationButton onLocate={handleLocate} isLocating={isLocating} />
      )}
    </PageShell>
  );
}

export default AppLayout;
