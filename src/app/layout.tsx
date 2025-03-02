import { GlobalContextProvider } from "@/src/components/context/GlobalContext"
import Providers from "@/src/components/context/Providers"
import Footer from "@/src/components/Footer"
import Navbar from "@/src/components/Navbar"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import { ReactNode } from "react"

const lato = Lato({ subsets: ["latin"], weight: "700" })

export const metadata: Metadata = {
	title: "CloudCast 🌤️",
	description: "Weather App!",
	keywords: ["CloudCast", "Weather", "Weather App", "CloudCast Page"],
	openGraph: {
		url: "https://cloudcast-live.vercel.app",
		title: "CloudCast 🌤️",
		description: "Weather App!",
		type: "website",
		images: "/opengraph-image.png"
	},
	other: {
		"google-site-verification": "2j0bcfhh8FCYPpzFylzbiPjl3Pa0X7lMuG060ctsCsA"
	}
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={lato.className}>
				<Providers>
					<GlobalContextProvider>
						<Navbar />
						{children}
						<Footer />
					</GlobalContextProvider>
				</Providers>
			</body>
		</html>
	)
}
