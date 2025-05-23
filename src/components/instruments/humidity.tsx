import { useGlobalContext } from "@/src/components/context/global-context";
import { Skeleton } from "@/src/components/ui/skeleton";
import { HUMIDITY_RATING } from "@/src/config/weather-config";
import { Droplets } from "lucide-react";

export default function Humidity() {
  const { forecast } = useGlobalContext();

  if (!forecast?.current) {
    return <Skeleton className="size-full" />;
  }

  const { relative_humidity_2m, surface_pressure, dew_point_2m } =
    forecast.current;

  const pressure = Math.round(surface_pressure);
  const dewPoint = Math.round(dew_point_2m);

  const humidityDescription = HUMIDITY_RATING(relative_humidity_2m);

  return (
    <div className="card flex h-48 flex-col p-4">
      <header className="flex items-center gap-2 text-lg font-medium">
        <Droplets size={25} className="icon text-muted-foreground" />
        <h4>Humidity</h4>
      </header>

      <div className="my-4 flex flex-col gap-2">
        <span className="text-xl font-medium">{relative_humidity_2m}%</span>

        <span className="text-sm">{humidityDescription}</span>

        <div className="flex flex-col">
          <div className="flex flex-row">
            <span className="text-sm font-medium">Dew Point:</span>
            <span className="ml-1 text-sm">{dewPoint}°</span>
          </div>

          <div className="flex flex-row">
            <span className="text-sm font-medium">Pressure:</span>
            <span className="ml-1 text-sm">{pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
