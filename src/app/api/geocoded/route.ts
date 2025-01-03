import { NextRequest, NextResponse } from "next/server"

// GET method for getting geocoded data
export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams
		const city = searchParams.get("search")

		const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=20&language=en&format=json`

		const res = await fetch(url)

		return NextResponse.json(await res.json())
	} catch (error) {
		console.error("Error fetching geocoded data:", error)
		return new Response("Error fetching geocoded data", { status: 500 })
	}
}
