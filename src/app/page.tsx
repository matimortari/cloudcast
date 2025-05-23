"use client";

import { useGlobalContextUpdate } from "@/src/components/context/global-context";
import AirQuality from "@/src/components/instruments/air-quality";
import FeelsLike from "@/src/components/instruments/feels-like";
import ForecastDaily from "@/src/components/instruments/forecast-daily";
import ForecastWeekly from "@/src/components/instruments/forecast-weekly";
import Humidity from "@/src/components/instruments/humidity";
import Mapbox from "@/src/components/instruments/mapbox";
import Precipitation from "@/src/components/instruments/precipitation";
import Sunset from "@/src/components/instruments/sunset";
import Temperature from "@/src/components/instruments/temperature";
import UvIndex from "@/src/components/instruments/uv-index";
import Visibility from "@/src/components/instruments/visibility";
import Wind from "@/src/components/instruments/wind";
import { DEFAULT_LOCATIONS } from "@/src/config/default-locations";

export default function Home() {
  const { setActiveCityCoords, updateCityName } = useGlobalContextUpdate();

  const getClickedCityCoords = (
    latitude: number,
    longitude: number,
    cityName: string,
  ) => {
    setActiveCityCoords([latitude, longitude]);
    updateCityName(cityName);
  };

  return (
    <div className="mx-6 md:mx-20">
      <main className="flex flex-col gap-2 pb-4 md:flex-row">
        <div className="flex w-full min-w-72 flex-col gap-2 md:w-fit">
          <Temperature />
          <ForecastWeekly />
        </div>

        <div className="flex w-full flex-col">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            <FeelsLike />
            <Precipitation />
            <Humidity />
            <Wind />
            <ForecastDaily />
            <UvIndex />
            <Sunset />
            <Visibility />
            <AirQuality />
          </div>

          <div className="my-2 flex w-full gap-2">
            <Mapbox />
            <div className="flex flex-col gap-2">
              {DEFAULT_LOCATIONS.map((location) => {
                return (
                  <button
                    key={location.name}
                    onClick={() => {
                      getClickedCityCoords(
                        location.latitude,
                        location.longitude,
                        location.name,
                      );
                    }}
                    className="card flex flex-col items-center gap-2"
                  >
                    <p className="p-4 text-center text-sm font-semibold hover:underline">
                      {location.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
