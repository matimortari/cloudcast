"use client"

import { getIcon } from "@/src/lib/weatherMappings"
import { ClockIcon } from "lucide-react"
import { useGlobalContext } from "../context/GlobalContext"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Skeleton } from "../ui/skeleton"

export default function ForecastDaily() {
	const { forecast } = useGlobalContext()

	if (!forecast?.hourly || !forecast?.current) {
		return <Skeleton className="size-full" />
	}

	const { weather_code } = forecast.current
	const { time = [], temperature_2m = [], precipitation = [] } = forecast.hourly

	const WeatherIcon = getIcon(weather_code)

	return (
		<div className="card col-span-full flex h-48 flex-col gap-4 p-4 md:col-span-3">
			<h4 className="flex items-center gap-2 font-medium">
				<ClockIcon size={25} className="icon" /> Daily Forecast
			</h4>

			<Carousel className="relative w-full overflow-x-auto">
				<CarouselContent className="flex flex-row gap-2">
					{time.length === 0 ? (
						<h2 className="font-semibold text-muted-foreground">No data available</h2>
					) : (
						time.map((timePoint: number, index: number) => (
							<CarouselItem key={timePoint} className="flex basis-32 flex-col items-center justify-center gap-2">
								<p className="text-xs">
									{new Date(timePoint).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
								</p>
								<WeatherIcon size={25} aria-hidden="true" />
								<p className="font-semibold">{temperature_2m[index]}°C</p>
								<p className="text-xs text-muted-foreground">{precipitation[index]} mm</p>
							</CarouselItem>
						))
					)}
				</CarouselContent>

				<CarouselPrevious className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-card" variant={"ghost"} />
				<CarouselNext className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-card" variant={"ghost"} />
			</Carousel>
		</div>
	)
}
