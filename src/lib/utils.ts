import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const defaultLocations = [
	{
		name: "New York",
		country: "US",
		admin1: "New York",
		latitude: 40.7128,
		longitude: -74.006
	},
	{
		name: "London",
		country: "GB",
		admin1: "Greater London",
		latitude: 51.5074,
		longitude: -0.1278
	},
	{
		name: "Madrid",
		country: "ES",
		admin1: "Madrid",
		latitude: 40.4165,
		longitude: -3.7026
	},
	{
		name: "Barcelona",
		country: "ES",
		admin1: "Catalonia",
		latitude: 41.3829,
		longitude: 2.1774
	},
	{
		name: "Sydney",
		country: "AU",
		admin1: "New South Wales",
		latitude: -33.8688,
		longitude: 151.2093
	},
	{
		name: "Tokyo",
		country: "JP",
		admin1: "Tokyo",
		latitude: 35.6762,
		longitude: 139.6503
	},
	{
		name: "Dubai",
		country: "AE",
		admin1: "Dubai",
		latitude: 25.2769,
		longitude: 55.2962
	}
]
