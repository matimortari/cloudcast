import { NextRequest, NextResponse } from "next/server"

// GET method for getting air quality data
export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams
		const lat = searchParams.get("lat")
		const lon = searchParams.get("lon")

		const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&forecast_days=1`

		const res = await fetch(url)

		return NextResponse.json(await res.json())
	} catch (error) {
		console.error("Error fetching pollution data ", error)
		return new Response("Error fetching pollution data", { status: 500 })
	}
}
