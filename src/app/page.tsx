"use client"

import { useGlobalContextUpdate } from "@/src/components/context/GlobalContext"
import AirQuality from "@/src/components/instruments/AirQuality"
import FeelsLike from "@/src/components/instruments/FeelsLike"
import ForecastDaily from "@/src/components/instruments/ForecastDaily"
import ForecastWeekly from "@/src/components/instruments/ForecastWeekly"
import Humidity from "@/src/components/instruments/Humidity"
import Mapbox from "@/src/components/instruments/Mapbox"
import Precipitation from "@/src/components/instruments/Precipitation"
import Sunset from "@/src/components/instruments/Sunset"
import Temperature from "@/src/components/instruments/Temperature"
import UvIndex from "@/src/components/instruments/UvIndex"
import Visibility from "@/src/components/instruments/Visibility"
import Wind from "@/src/components/instruments/Wind"
import { defaultLocations } from "@/src/lib/utils"

export default function Home() {
	const { setActiveCityCoords, updateCityName } = useGlobalContextUpdate()

	const getClickedCityCoords = (latitude: number, longitude: number, cityName: string) => {
		setActiveCityCoords([latitude, longitude])
		updateCityName(cityName)
	}

	return (
		<div className="mx-4 lg:mx-8 xl:mx-24">
			<div className="flex flex-col gap-2 pb-4 md:flex-row">
				<div className="flex w-full min-w-72 flex-col gap-2 md:w-96">
					<Temperature />
					<ForecastWeekly />
				</div>

				<div className="flex w-full flex-col">
					<div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
						<FeelsLike />
						<Precipitation />
						<Humidity />
						<Wind />
						<ForecastDaily />
						<UvIndex />
						<Sunset />
						<Visibility />
						<AirQuality />
					</div>

					<div className="my-2 flex h-full gap-2">
						<Mapbox />
						<div className="flex flex-col gap-2">
							{defaultLocations.map((location, index) => {
								return (
									<section
										key={index}
										onClick={() => {
											getClickedCityCoords(location.latitude, location.longitude, location.name)
										}}
										className="flex cursor-pointer flex-col gap-2"
									>
										<p className="px-2 py-4 text-center text-sm font-semibold">{location.name}</p>
									</section>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
