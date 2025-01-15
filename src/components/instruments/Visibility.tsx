import { visibilityRating } from "@/src/lib/weatherRatings"
import { Eye } from "lucide-react"
import { useGlobalContext } from "../context/GlobalContext"
import { Skeleton } from "../ui/skeleton"

export default function Visibility() {
	const { forecast } = useGlobalContext()

	if (!forecast?.hourly) {
		return <Skeleton className="size-full" />
	}

	const { visibility = [] } = forecast.hourly

	const visibilityInKm = Math.round(visibility[0] / 1000)
	const visibilityDescription = visibilityRating(visibilityInKm)

	return (
		<div className="card flex h-48 flex-col p-4">
			<h4 className="flex items-center gap-2 font-medium">
				<Eye size={25} className="icon" /> Visibility
			</h4>

			<div className="my-4 flex flex-col gap-4">
				<p className="text-2xl font-medium">
					{visibilityInKm} <span className="text-base">km</span>
				</p>
				<p className="w-36 text-sm">{visibilityDescription}</p>
			</div>
		</div>
	)
}
