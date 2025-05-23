import { useGlobalContext } from "@/src/components/context/global-context";
import { Skeleton } from "@/src/components/ui/skeleton";
import { WindIcon } from "lucide-react";

export default function Wind() {
  const { forecast } = useGlobalContext();

  if (!forecast?.current) {
    return <Skeleton className="size-full" />;
  }

  const { wind_speed_10m, wind_direction_10m } = forecast.current;

  const windSpeed = Math.round(wind_speed_10m);
  const windDirection = Math.round(wind_direction_10m);

  return (
    <div className="card flex h-48 flex-col p-4">
      <header className="flex items-center gap-2 font-medium">
        <WindIcon size={25} className="icon text-muted-foreground" />
        <h4>Wind</h4>
      </header>

      <div className="my-4 flex flex-col gap-1">
        <span className="text-sm font-medium">Wind Speed:</span>
        <span className="text-lg">{windSpeed} km/h</span>
        <span className="text-sm font-medium">Wind Direction:</span>
        <span className="text-lg">{windDirection}°</span>
      </div>
    </div>
  );
}
