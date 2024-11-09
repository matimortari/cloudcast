"use client"

import { Icon } from "@iconify/react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function Navbar() {
	const { theme, setTheme } = useTheme()

	const handleThemeToggle = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	return (
		<nav className="flex items-center justify-between p-2 shadow-md">
			<div className="flex items-center gap-2">
				<Link className="button" href="/">
					Home
				</Link>
			</div>

			<div className="flex items-center gap-2">
				<button onClick={handleThemeToggle} className="button h-10 w-10">
					<Icon
						icon={theme === "light" ? "material-symbols:light-mode-rounded" : "material-symbols:dark-mode-rounded"}
					/>
				</button>
			</div>
		</nav>
	)
}
