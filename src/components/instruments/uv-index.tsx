import { useGlobalContext } from "@/src/components/context/global-context";
import { Progress } from "@/src/components/ui/progress";
import { Skeleton } from "@/src/components/ui/skeleton";
import { UV_RATING } from "@/src/config/weather-config";
import { SunDim } from "lucide-react";

export default function UvIndex() {
  const { forecast } = useGlobalContext();

  if (!forecast?.daily) {
    return <Skeleton className="size-full" />;
  }

  const { uv_index_max = [] } = forecast.daily;

  const uvIndex = Math.ceil(uv_index_max[0]);
  const { rating, description } = UV_RATING(uvIndex);

  return (
    <div className="card col-span-full flex h-48 flex-col p-4 md:col-span-1">
      <header className="flex items-center gap-2 font-medium">
        <SunDim size={25} className="icon text-muted-foreground" />
        <h4>UV Index</h4>
      </header>

      <div className="my-4 flex flex-col gap-2">
        <span className="text-2xl font-medium">
          {uvIndex} <span className="text-sm">({rating})</span>
        </span>

        <Progress
          className="progress"
          value={Math.min(uvIndex, 10) * 10}
          max={100}
        />

        <span className="text-sm">{description}</span>
      </div>
    </div>
  );
}
