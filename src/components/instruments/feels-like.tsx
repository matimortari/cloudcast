import { useGlobalContext } from "@/src/components/context/global-context";
import { Skeleton } from "@/src/components/ui/skeleton";
import { FEELS_LIKE_RATING } from "@/src/config/weather-config";
import { Thermometer } from "lucide-react";

export default function FeelsLike() {
  const { forecast } = useGlobalContext();

  if (!forecast?.current) {
    return <Skeleton className="size-full" />;
  }

  const { apparent_temperature, temperature_2m } = forecast.current;

  const feelsLike = Math.round(apparent_temperature);
  const currentTemp = Math.round(temperature_2m);
  const feelsLikeDescription = FEELS_LIKE_RATING(feelsLike, currentTemp);

  return (
    <div className="card flex h-48 flex-col p-4">
      <header className="flex items-center gap-2 font-medium">
        <Thermometer size={25} className="icon text-muted-foreground" />
        <h4>Feels Like</h4>
      </header>

      <div className="my-4 flex flex-col gap-4">
        <span className="text-2xl font-medium">{feelsLike}°</span>
        <span className="w-36 text-sm">{feelsLikeDescription}</span>
      </div>
    </div>
  );
}
