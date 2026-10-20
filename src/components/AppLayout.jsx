import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "./Header";
import Navbar from "./Navbar";
import PageShell from "./PageShell";
import SearchBar from "./SearchBar";
import LocationButton from "./LocationButton";
import { useUserLocation } from "../hooks/useUserLocation";

function AppLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
    navigate("/");
  };

  const handleLocate = () => {
    setSource("location");
    getPosition();
    navigate("/");
  };

  // Hide the button only when my location is already on screen
  const showLocationButton = !(usingMyLocation && pathname === "/");

  return (
    <PageShell isDay={isDay}>
      <div className="mb-6 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <Header />
        <Navbar isDay={isDay} />
      </div>

      <SearchBar onSearch={handleSearch} />

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

      {showLocationButton && (
        <LocationButton onLocate={handleLocate} isLocating={isLocating} />
      )}
    </PageShell>
  );
}

export default AppLayout;
