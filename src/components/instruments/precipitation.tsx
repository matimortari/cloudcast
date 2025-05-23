import { useGlobalContext } from "@/src/components/context/global-context";
import { Skeleton } from "@/src/components/ui/skeleton";
import { PRECIPITATION_RATING } from "@/src/config/weather-config";
import { CloudRain } from "lucide-react";

export default function Precipitation() {
  const { forecast } = useGlobalContext();

  if (!forecast?.current) {
    return <Skeleton className="h-full" />;
  }

  const { precipitation, rain, snowfall } = forecast.current;

  const precipitationDescription = PRECIPITATION_RATING(precipitation);

  return (
    <div className="card flex h-48 flex-col p-4">
      <header className="flex items-center gap-2 text-lg font-medium">
        <CloudRain size={25} className="icon text-muted-foreground" />
        <h4>Precipitation</h4>
      </header>

      <div className="my-4 flex flex-col gap-2">
        <span className="text-xl font-medium">{precipitation} mm</span>

        <span className="text-sm">{precipitationDescription}</span>

        <div className="flex flex-col">
          <div className="flex flex-row">
            <span className="text-sm font-medium">Rain:</span>
            <span className="ml-1 text-sm">{rain} mm</span>
          </div>

          <div className="flex flex-row">
            <span className="text-sm font-medium">Snowfall:</span>
            <span className="ml-1 text-sm">{snowfall} mm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
