import Footer from "@/src/components/Footer"
import Navbar from "@/src/components/Navbar"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { GlobalContextProvider } from "../components/context/GlobalContext"
import Providers from "../components/context/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "CloudCast 🌤️",
	description: "Weather App!",
	keywords: ["CloudCast", "Weather", "Weather App", "CloudCast Page"],
	openGraph: {
		url: "https://cloudcast-live.vercel.app/",
		images: "/cover.png",
		title: "CloudCast 🌤️",
		description: "Weather App!",
		type: "website"
	},
	other: {
		"google-site-verification": "2j0bcfhh8FCYPpzFylzbiPjl3Pa0X7lMuG060ctsCsA"
	}
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
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
