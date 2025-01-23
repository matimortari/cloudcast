import { airQualityRating } from "@/src/lib/weatherDescriptions"
import { Gauge } from "lucide-react"
import { useGlobalContext } from "../context/GlobalContext"
import { Progress } from "../ui/progress"
import { Skeleton } from "../ui/skeleton"

export default function AirQuality() {
	const { airQuality } = useGlobalContext()

	if (!airQuality?.current) {
		return <Skeleton className="w-full" />
	}

	const { us_aqi, pm10, pm2_5, carbon_monoxide, nitrogen_dioxide, sulphur_dioxide, ozone } = airQuality.current

	const airQualityDescription = airQualityRating(us_aqi)

	return (
		<div className="card col-span-2 flex h-auto w-full flex-col p-4 md:h-48 md:flex-row md:gap-10">
			<div className="flex flex-1 flex-col">
				<h4 className="flex items-center gap-2 font-medium">
					<Gauge size={25} className="icon" /> Air Quality
				</h4>

				<div className="my-4 flex flex-col gap-2">
					<p className="text-sm">Air Quality Index: {us_aqi}</p>
					<Progress className="progress" value={us_aqi} max={300} />
					<p className="text-sm">{airQualityDescription}</p>
				</div>
			</div>

			<div className="flex flex-1 flex-row gap-1">
				<div className="flex flex-1 flex-col gap-1 text-sm font-semibold">
					<p>
						PM10: <span className="font-normal">{pm10 ?? "N/A"} μg/m³</span>
					</p>
					<p>
						PM2.5: <span className="font-normal">{pm2_5 ?? "N/A"} μg/m³</span>
					</p>
					<p>
						Carbon Monoxide: <span className="font-normal">{carbon_monoxide ?? "N/A"} μg/m³</span>
					</p>
				</div>

				<div className="flex flex-1 flex-col gap-1 text-sm font-semibold">
					<p>
						Nitrogen Dioxide: <span className="font-normal">{nitrogen_dioxide ?? "N/A"} μg/m³</span>
					</p>
					<p>
						Sulphur Dioxide: <span className="font-normal">{sulphur_dioxide ?? "N/A"} μg/m³</span>
					</p>
					<p>
						Ozone: <span className="font-normal">{ozone ?? "N/A"} μg/m³</span>
					</p>
				</div>
			</div>
		</div>
	)
}
