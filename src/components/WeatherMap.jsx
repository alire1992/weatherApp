import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { getWeatherByCode } from "../utilities";
import { useFavorites } from "../context/FavoritesContext";

const pinIcon = L.divIcon({
  className: "",
  html: '<div class="text-3xl drop-shadow">📍</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Shown for a favorite while its weather is still loading
const loadingIcon = L.divIcon({
  className: "",
  html: '<div class="h-5 w-5 rounded-full border-2 border-white bg-orange-500 shadow-lg"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// "TV forecast" marker: weather icon + temperature
function weatherIcon(current) {
  const isDay = Number(current.is_day) === 1;
  const { icon } = getWeatherByCode(current.weather_code, isDay);

  return L.divIcon({
    className: "",
    html: `<div class="flex h-12 w-12 flex-col items-center justify-center rounded-xl border-2 border-orange-500 bg-white/95 shadow-lg">
             <span class="text-xl leading-none">${icon}</span>
             <span class="text-xs font-bold text-blue-900">${Math.round(current.temperature_2m)}°</span>
           </div>`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
}

// The URL is the single source of truth: MapPage passes `selected` down and
// gets clicks back through `onSelect`.
function WeatherMap({ selected, onSelect, favorites, favoritesWeather }) {
  const { isFavorite } = useFavorites();

  return (
    <MapContainer
      // `center` and `zoom` are only read on the FIRST render (Leaflet limitation),
      // so later moves are done by <FlyToSelected /> below.
      center={selected ? [selected.lat, selected.lon] : [30, 20]}
      zoom={selected ? 7 : 3}
      minZoom={2}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="soft-tiles"
      />

      {/* Hide the pin when the clicked point is already a favorite marker */}
      {selected && !isFavorite(selected.lat, selected.lon) && (
        <Marker position={[selected.lat, selected.lon]} icon={pinIcon} />
      )}

      {favorites.map((fav, i) => (
        <FavoriteMarker
          key={`${fav.lat},${fav.lon}`}
          favorite={fav}
          current={favoritesWeather[i]?.current}
          onSelect={onSelect}
        />
      ))}

      <FitToFavorites favorites={favorites} enabled={!selected} />
      <FlyToSelected selected={selected} />
      <DetectClick onSelect={onSelect} />
    </MapContainer>
  );
}

function FavoriteMarker({ favorite, current, onSelect }) {
  // useMemo: a new icon object on every render would make the marker flicker
  const icon = useMemo(
    () => (current ? weatherIcon(current) : loadingIcon),
    [current],
  );

  const isDay = current ? Number(current.is_day) === 1 : true;
  const weather = current
    ? getWeatherByCode(current.weather_code, isDay)
    : null;

  return (
    <Marker
      position={[favorite.lat, favorite.lon]}
      icon={icon}
      eventHandlers={{
        click: () =>
          onSelect({
            lat: favorite.lat,
            lon: favorite.lon,
            cityName: favorite.cityName,
          }),
      }}
    >
      {/* Hover on desktop, tap on touch screens */}
      <Tooltip direction="top" offset={[0, -24]}>
        <strong>{favorite.cityName}</strong>
        <br />
        {weather
          ? `${weather.status} · ${Math.round(current.temperature_2m)}°`
          : "Loading…"}
      </Tooltip>
    </Marker>
  );
}

// On first load with no selected point, zoom out so all favorites are visible
function FitToFavorites({ favorites, enabled }) {
  const map = useMap();
  const done = useRef(false);

  useEffect(() => {
    if (done.current || !enabled || favorites.length === 0) return;
    done.current = true;

    map.fitBounds(
      favorites.map((f) => [f.lat, f.lon]),
      { padding: [60, 60], maxZoom: 6 },
    );
  }, [map, favorites, enabled]);

  return null;
}

// Moves the map when the selected point changes (click, link, or favorite)
function FlyToSelected({ selected }) {
  const map = useMap();
  const lat = selected?.lat;
  const lon = selected?.lon;

  useEffect(() => {
    if (lat == null || lon == null) return;
    map.flyTo([lat, lon], map.getZoom());
  }, [map, lat, lon]);

  return null;
}

function DetectClick({ onSelect }) {
  useMapEvents({
    click: (e) => onSelect({ lat: e.latlng.lat, lon: e.latlng.lng }),
  });
  return null;
}

export default WeatherMap;
