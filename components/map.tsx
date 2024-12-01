"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@nextui-org/button";
import { startTracking } from "@/core/signalRService";

interface Location {
  lat: number;
  lon: number;
}

interface MapProps {
  locations: Location[];
}

const Map: React.FC<MapProps> = ({ locations }) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  useEffect(() => {
    const initialMap = L.map("map", {
      center: [51.505, -0.09], // Initial map center
      zoom: 13, // Initial zoom level
    });

    // Dark theme tile layer
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 17,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(initialMap);

    setMap(initialMap);

    // Cleanup on unmount
    return () => {
      initialMap.remove();         
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    // Remove existing markers
    markers.forEach((marker) => {
      map.removeLayer(marker);
    });

    const carIcon = L.icon({
        iconUrl: '/car.png', // Use the imported URL
        iconSize: [60, 28], // Size of the icon
        iconAnchor: [32, 30], // Adjust as needed based on your icon size
        popupAnchor: [0, -30], // Adjust for popups if needed
      });

    let newMarker;
    // Create new markers
    if (locations.length > 0) {
      newMarker = L.marker([
        locations[locations.length - 1].lat,
        locations[locations.length - 1].lon,
      ],  { icon: carIcon } ).addTo(map);
      setMarkers([newMarker]);
    }


    // Draw polyline if locations are valid
    if (locations.length > 0) {
      const latLngs: L.LatLngTuple[] = locations.map(
        (loc) => [loc.lat, loc.lon] as L.LatLngTuple
      );
      const polyline = L.polyline(latLngs, { color: "#006fee" }).addTo(map);

      // Fit the map to the polyline bounds only if valid
      if (polyline.getLatLngs().length > 0) {
        map.fitBounds(polyline.getBounds());
      }
    }
  }, [map, locations]);

  return (
    <>
      <Button className="mb-5" color="primary" onClick={() => startTracking()}>
        Start Tracking
      </Button>
      <div id="map" style={{ height: "700px", width: "100%" }} />
    </>
  );
};

export default Map;
