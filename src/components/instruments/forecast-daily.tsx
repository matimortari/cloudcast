"use client";

import { useGlobalContext } from "@/src/components/context/global-context";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Skeleton } from "@/src/components/ui/skeleton";
import { getIcon } from "@/src/config/weather-mappings";
import { ClockIcon } from "lucide-react";

export default function ForecastDaily() {
  const { forecast } = useGlobalContext();

  if (!forecast?.hourly || !forecast?.current) {
    return <Skeleton className="size-full" />;
  }

  const { weather_code } = forecast.current;
  const {
    time = [],
    temperature_2m = [],
    precipitation = [],
  } = forecast.hourly;

  const WeatherIcon = getIcon(weather_code);

  return (
    <div className="card col-span-full flex h-48 flex-col gap-4 p-4 md:col-span-3">
      <header className="flex items-center gap-2 font-medium">
        <ClockIcon size={25} className="icon text-muted-foreground" />
        <h4>Daily Forecast</h4>
      </header>

      <Carousel className="relative flex w-full">
        <CarouselContent className="flex flex-row gap-2">
          {time.length === 0 ? (
            <h2 className="font-semibold text-muted-foreground">
              No data available
            </h2>
          ) : (
            time.map((timePoint: number, index: number) => (
              <CarouselItem
                key={timePoint}
                className="flex basis-28 flex-col items-center justify-center gap-2 first:ml-6 last:mr-6"
              >
                <p className="text-xs">
                  {new Date(timePoint).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <WeatherIcon size={25} className="text-muted-foreground" />
                <span className="font-bold">{temperature_2m[index]}°C</span>
                <span className="text-xs text-muted-foreground">
                  {precipitation[index]} mm
                </span>
              </CarouselItem>
            ))
          )}
        </CarouselContent>

        <CarouselPrevious
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-muted"
          variant={"ghost"}
        />
        <CarouselNext
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-muted"
          variant={"ghost"}
        />
      </Carousel>
    </div>
  );
}
