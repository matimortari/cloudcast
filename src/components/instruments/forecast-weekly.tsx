import { useGlobalContext } from "@/src/components/context/global-context";
import { Progress } from "@/src/components/ui/progress";
import { Skeleton } from "@/src/components/ui/skeleton";
import { CalendarDays } from "lucide-react";

export default function ForecastWeekly() {
  const { weeklyForecast } = useGlobalContext();

  if (!weeklyForecast?.daily) {
    return <Skeleton className="size-full" />;
  }

  const {
    time = [],
    temperature_2m_max = [],
    temperature_2m_min = [],
    precipitation_sum = [],
  } = weeklyForecast.daily;

  const dailyForecast = time.map((day: number, index: number) => ({
    day: new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
    minTemp: Math.round(temperature_2m_min[index]),
    maxTemp: Math.round(temperature_2m_max[index]),
    precipitation: precipitation_sum[index],
  }));

  const maxTemp = Math.max(...temperature_2m_max);
  const minTemp = Math.min(...temperature_2m_min);
  const tempRange = maxTemp - minTemp;

  return (
    <div className="card flex flex-1 flex-col justify-between p-4">
      <header className="flex items-center gap-2 py-2 font-medium">
        <CalendarDays size={25} className="icon text-muted-foreground" />
        <h4>Weekly Forecast</h4>
      </header>

      {dailyForecast.map((day: any) => (
        <div
          key={day.day}
          className="flex flex-col justify-evenly border-b-2 p-2 last:border-b-0"
        >
          <span className="text-lg font-bold">{day.day}</span>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>(low)</span>
            <span>(high)</span>
          </div>

          <div className="flex flex-1 items-center justify-between gap-2">
            <span className="font-bold">{day.minTemp}°C</span>

            <div className="relative flex flex-1 items-center">
              <span className="absolute -top-6 w-full text-center text-xs text-muted-foreground">
                Precipitation: {day.precipitation} mm
              </span>

              <Progress
                className="progress w-full"
                value={Math.round(
                  ((day.maxTemp - day.minTemp) / tempRange) * 100,
                )}
              />
            </div>

            <span className="font-bold">{day.maxTemp}°C</span>
          </div>
        </div>
      ))}
    </div>
  );
}
