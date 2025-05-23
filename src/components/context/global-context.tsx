"use client";

import { DEFAULT_LOCATIONS } from "@/src/config/default-locations";
import { debounce } from "lodash";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const GlobalContext = createContext<Readonly<GlobalContextType> | undefined>(
  undefined,
);
const GlobalContextUpdate = createContext<
  Readonly<GlobalContextUpdateType> | undefined
>(undefined);

export function GlobalContextProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [activeCityCoords, setActiveCityCoords] = useState<[number, number]>([
    40.7128, -74.006,
  ]);
  const [activeCityName, setActiveCityName] = useState("New York");
  const [inputValue, setInputValue] = useState("");
  const [geoCodedList, setGeoCodedList] = useState(DEFAULT_LOCATIONS);
  const [forecast, setForecast] = useState<any>({});
  const [weeklyForecast, setWeeklyForecast] = useState<any>({});
  const [airQuality, setAirQuality] = useState<any>(null);

  // Fetch geocoded list
  const fetchGeoCodedList = async (search: string) => {
    try {
      const res = await fetch(`/api/geocoded?search=${search}`);
      const data = await res.json();
      const locations = data.results || [];
      setGeoCodedList(locations);
    } catch (error: any) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  // Fetch forecast
  const fetchForecast = async (latitude: number, longitude: number) => {
    try {
      const res = await fetch(`/api/current?lat=${latitude}&lon=${longitude}`);
      const data = await res.json();
      setForecast(data);
    } catch (error: any) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  // Fetch weekly forecast
  const fetchWeeklyForecast = async (latitude: number, longitude: number) => {
    try {
      const res = await fetch(`/api/weekly?lat=${latitude}&lon=${longitude}`);
      const data = await res.json();
      setWeeklyForecast(data);
    } catch (error: any) {
      console.log("Error fetching weekly forecast data: ", error.message);
    }
  };

  // Fetch air quality data
  const fetchAirQuality = async (latitude: number, longitude: number) => {
    try {
      const res = await fetch(`/api/air?lat=${latitude}&lon=${longitude}`);
      const data = await res.json();
      setAirQuality(data);
    } catch (error: any) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };

  // Handle input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setGeoCodedList(DEFAULT_LOCATIONS);
    }
  };

  // Debounce fetch geocoded list
  useEffect(() => {
    const debouncedFetch = debounce((search: string) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    return () => debouncedFetch.cancel();
  }, [inputValue]);

  // Fetch data on initial load
  useEffect(() => {
    const [latitude, longitude] = activeCityCoords;

    fetchForecast(latitude, longitude);
    fetchWeeklyForecast(latitude, longitude);
    fetchAirQuality(latitude, longitude);
  }, [activeCityCoords]);

  const updateCityName = (name: string) => {
    setActiveCityName(name);
  };

  const getClickedCityCoords = (
    latitude: number,
    longitude: number,
    cityName: string,
  ) => {
    setActiveCityCoords([latitude, longitude]);
    updateCityName(cityName);
  };

  return (
    <GlobalContext.Provider
      value={Object.freeze({
        forecast,
        weeklyForecast,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
        airQuality,
        activeCityName,
      })}
    >
      <GlobalContextUpdate.Provider
        value={Object.freeze({
          setActiveCityCoords,
          updateCityName,
          getClickedCityCoords,
        })}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = (): Readonly<GlobalContextType> => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider",
    );
  }

  return context;
};

export const useGlobalContextUpdate = (): Readonly<GlobalContextUpdateType> => {
  const context = useContext(GlobalContextUpdate);
  if (!context) {
    throw new Error(
      "useGlobalContextUpdate must be used within a GlobalContextUpdateProvider",
    );
  }

  return context;
};
