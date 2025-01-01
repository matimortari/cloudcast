"use client"

import { Icon } from "@iconify/react"
import { useTheme } from "next-themes"
import SearchDialog from "./SearchDialog"
import { Button } from "./ui/button"

export default function Navbar() {
	const { theme, setTheme } = useTheme()

	const handleThemeToggle = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	return (
		<nav className="mx-4 flex items-center justify-between py-2 lg:mx-8 xl:mx-24">
			<div className="flex items-center gap-6" />
			<div className="flex items-center gap-2">
				<SearchDialog />
				<Button onClick={handleThemeToggle} className="btn flex size-10 items-center justify-center">
					<Icon
						icon={theme === "light" ? "material-symbols:light-mode-rounded" : "material-symbols:dark-mode-rounded"}
					/>
				</Button>
			</div>
		</nav>
	)
}
