import { useGlobalContext } from "@/src/components/context/global-context";
import { Skeleton } from "@/src/components/ui/skeleton";
import { SunsetIcon } from "lucide-react";
import moment from "moment-timezone";

export default function Sunset() {
  const { forecast } = useGlobalContext();

  if (!forecast?.daily || !forecast?.timezone) {
    return <Skeleton className="h-full" />;
  }

  const { timezone } = forecast;
  const { sunrise = [], sunset = [] } = forecast.daily;

  const sunsetTime = moment(sunset[0]).tz(timezone).format("HH:mm");
  const sunriseTime = moment(sunrise[0]).tz(timezone).format("HH:mm");

  return (
    <div className="card flex h-48 flex-col p-4">
      <header className="flex items-center gap-2 font-medium">
        <SunsetIcon size={25} className="icon text-muted-foreground" />
        <h4>Sunset & Sunrise</h4>
      </header>

      <div className="mt-4 flex flex-col gap-1">
        <span className="text-sm font-medium">Sunset at:</span>
        <span className="text-lg">{sunsetTime}</span>
        <span className="text-sm font-medium">Sunrise at:</span>
        <span className="text-lg">{sunriseTime}</span>
      </div>
    </div>
  );
}
