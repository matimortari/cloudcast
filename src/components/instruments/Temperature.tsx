"use client"

import { getDescription, getIcon } from "@/src/lib/weatherMappings"
import moment from "moment-timezone"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import { Skeleton } from "../ui/skeleton"

export default function Temperature() {
	const { forecast, activeCityName } = useGlobalContext()

	const [localTime, setLocalTime] = useState<string>("")
	const [currentDate, setCurrentDate] = useState<string>("")

	// Update local time every second based on the forecast timezone
	useEffect(() => {
		if (forecast?.timezone) {
			const interval = setInterval(() => {
				const localMoment = moment().tz(forecast.timezone)
				setLocalTime(localMoment.format("HH:mm"))
				setCurrentDate(localMoment.format("dddd, MMM Do YYYY"))
			}, 1000)
			return () => clearInterval(interval)
		}
	}, [forecast?.timezone])

	if (!forecast?.current || !forecast?.daily) {
		return <Skeleton className="size-full" />
	}

	const { temperature_2m, weather_code } = forecast.current
	const { temperature_2m_min = [], temperature_2m_max = [] } = forecast.daily

	const temp = Math.round(temperature_2m)
	const minTemp = Math.round(temperature_2m_min[0])
	const maxTemp = Math.round(temperature_2m_max[0])
	const weatherCode = weather_code
	const WeatherIcon = getIcon(weatherCode)
	const weatherDescription = getDescription(weatherCode)

	return (
		<div className="card flex flex-col justify-between p-4">
			<p className="flex items-center justify-between">
				<span className="text-sm font-medium">{currentDate}</span>
				<span className="text-sm font-medium">{localTime}</span>
			</p>

			<p className="flex gap-2 font-bold">
				<span>{activeCityName}</span>
			</p>

			<p className="self-center p-4 text-9xl font-bold">{temp}°</p>

			<WeatherIcon size={30} className="icon" />
			<p className="py-2 text-lg font-semibold">{weatherDescription}</p>
			<p className="flex items-center gap-2">
				<span>Low: {minTemp}°</span>
				<span>High: {maxTemp}°</span>
			</p>
		</div>
	)
}
