import { NextRequest, NextResponse } from "next/server";

// GET method for getting weekly forecast data
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum`,
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weekly forecast data:", error);
    return new NextResponse("Error fetching weekly forecast data", {
      status: 500,
    });
  }
}
