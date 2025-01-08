import { SunsetIcon } from "lucide-react"
import moment from "moment-timezone"
import { useGlobalContext } from "../context/GlobalContext"
import { Skeleton } from "../ui/skeleton"

export default function Sunset() {
	const { forecast } = useGlobalContext()

	if (!forecast?.daily || !forecast?.timezone) {
		return <Skeleton className="h-full" />
	}

	const { timezone } = forecast
	const { sunrise = [], sunset = [] } = forecast.daily

	const sunsetTime = moment(sunset[0]).tz(timezone).format("HH:mm")
	const sunriseTime = moment(sunrise[0]).tz(timezone).format("HH:mm")

	return (
		<section className="flex h-48 flex-col p-4">
			<h4 className="flex items-center gap-2 font-medium">
				<SunsetIcon size={25} className="icon" /> Sunset
			</h4>

			<div className="mt-4 flex flex-col gap-1">
				<p className="text-sm font-medium">Sunset at:</p>
				<p className="text-lg">{sunsetTime}</p>
				<p className="text-sm font-medium">Sunrise at:</p>
				<p className="text-lg">{sunriseTime}</p>
			</div>
		</section>
	)
}
