"use client";

import { useGlobalContext } from "@/src/components/context/global-context";
import { Skeleton } from "@/src/components/ui/skeleton";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

// Disable server-side rendering for MapContainer
const MapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  {
    ssr: false,
  },
);

// Disable server-side rendering for TileLayer
const TileLayer = dynamic(
  () => import("react-leaflet").then((module) => module.TileLayer),
  {
    ssr: false,
  },
);

function FlyToActiveCity({ activeCityCoords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCoords?.latitude && activeCityCoords?.longitude) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo(
        [activeCityCoords.latitude, activeCityCoords.longitude],
        zoomLev,
        flyToOptions,
      );
    }
  }, [activeCityCoords, map]);

  return null;
}

export default function Mapbox() {
  const { forecast } = useGlobalContext();

  const [mapLoaded, setMapLoaded] = useState(false);

  if (!forecast?.latitude || !forecast?.longitude) {
    return <Skeleton className="size-full" />;
  }

  const activeCityCoords = {
    latitude: forecast?.latitude,
    longitude: forecast?.longitude,
  };

  return (
    <div className="card relative flex-1 basis-1/2">
      {!mapLoaded && <Skeleton className="absolute left-0 top-0 size-full" />}
      <MapContainer
        zoom={10}
        center={[activeCityCoords.latitude, activeCityCoords.longitude]}
        style={{
          height: "calc(100% - 2rem)",
          width: "calc(100% - 2rem)",
          margin: "1rem",
          borderRadius: "0.25rem",
        }}
        whenReady={() => setMapLoaded(true)}
        attributionControl={false}
      >
        <TileLayer
          url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${process.env.STADIA_API_KEY}`}
          attribution="&copy; <a href='https://www.stadiamaps.com/'>Stadia Maps</a>"
        />
        <FlyToActiveCity activeCityCoords={activeCityCoords} />
      </MapContainer>
    </div>
  );
}
