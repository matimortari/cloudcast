import { useGlobalContext } from "@/src/components/context/global-context";
import { Progress } from "@/src/components/ui/progress";
import { Skeleton } from "@/src/components/ui/skeleton";
import { AQ_RATING } from "@/src/config/weather-config";
import { Gauge } from "lucide-react";

export default function AirQuality() {
  const { airQuality } = useGlobalContext();

  if (!airQuality?.current) {
    return <Skeleton className="w-full" />;
  }

  const {
    us_aqi,
    pm10,
    pm2_5,
    carbon_monoxide,
    nitrogen_dioxide,
    sulphur_dioxide,
    ozone,
  } = airQuality.current;

  const airQualityDescription = AQ_RATING(us_aqi);

  return (
    <div className="card col-span-2 flex h-auto w-full flex-col p-4 md:h-48 md:flex-row md:gap-10">
      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-2 font-medium">
          <Gauge size={25} className="icon text-muted-foreground" />
          <h4>Air Quality</h4>
        </header>

        <div className="my-4 flex flex-col gap-2">
          <span className="text-sm">Air Quality Index: {us_aqi}</span>
          <Progress value={us_aqi} max={300} className="progress" />
          <span className="text-sm">{airQualityDescription}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-row gap-1">
        <div className="flex flex-1 flex-col gap-1 text-sm font-semibold">
          <span>
            PM10: <span>{pm10 ?? "N/A"} μg/m³</span>
          </span>
          <span>
            PM2.5: <span>{pm2_5 ?? "N/A"} μg/m³</span>
          </span>
          <span>
            Carbon Monoxide: <span>{carbon_monoxide ?? "N/A"} μg/m³</span>
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1 text-sm font-semibold">
          <span>
            Nitrogen Dioxide: <span>{nitrogen_dioxide ?? "N/A"} μg/m³</span>
          </span>
          <span>
            Sulphur Dioxide: <span>{sulphur_dioxide ?? "N/A"} μg/m³</span>
          </span>
          <span>
            Ozone: <span>{ozone ?? "N/A"} μg/m³</span>
          </span>
        </div>
      </div>
    </div>
  );
}
