import { getIcon } from "@/src/lib/weatherMappings"
import { ClockIcon } from "lucide-react"
import moment from "moment"
import { useGlobalContext } from "../context/GlobalContext"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Skeleton } from "../ui/skeleton"

export default function ForecastDaily() {
	const { forecast } = useGlobalContext()

	if (!forecast?.hourly || !forecast?.timezone) {
		return <Skeleton className="w-full" />
	}

	const { time, temperature_2m, precipitation } = forecast.hourly
	const { timezone } = forecast

	// Extract every hour from the forecast data
	const fourHourForecast = time
		.map((timestamp, index) => ({
			time: timestamp,
			temperature: temperature_2m[index],
			precipitation: precipitation[index]
		}))
		.filter((_, index) => index % 1 === 0)

	const { current } = forecast

	const weatherCode = current?.weather_code || 0
	const WeatherIcon = getIcon(weatherCode)

	return (
		<section className="col-span-full flex h-48 flex-col gap-4 p-4 md:col-span-3">
			<h2 className="flex items-center gap-2 font-medium">
				<ClockIcon size={25} className="icon" /> Daily Forecast
			</h2>

			<div className="relative flex w-full flex-row items-center justify-center overflow-hidden">
				{fourHourForecast.length === 0 ? (
					<h1 className="font-semibold">No data available</h1>
				) : (
					<Carousel className="relative w-full">
						<div className="relative flex items-center justify-center">
							<CarouselContent className="flex max-w-lg gap-4">
								{fourHourForecast.map((forecast) => (
									<CarouselItem className="flex basis-28 flex-col items-center gap-1" key={forecast.time}>
										<p className="text-muted-foreground">{moment(forecast.time).tz(timezone).format("HH:mm")}</p>
										<WeatherIcon size={25} aria-hidden="true" />
										<p className="font-semibold">{Math.round(forecast.temperature)}°C</p>
										<p className="text-xs text-muted-foreground">{forecast.precipitation} mm</p>
									</CarouselItem>
								))}
							</CarouselContent>
						</div>
						<CarouselPrevious className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-card" variant={"ghost"} />
						<CarouselNext className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-card" variant={"ghost"} />
					</Carousel>
				)}
			</div>
		</section>
	)
}
