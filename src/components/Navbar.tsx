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
		<nav className="mx-6 flex items-center justify-center py-2 md:mx-20 md:justify-end">
			<div className="flex items-center gap-2">
				<SearchDialog />
				<Button onClick={handleThemeToggle} className="flex items-center justify-center bg-card hover:bg-muted">
					<Icon
						icon={theme === "light" ? "material-symbols:light-mode-rounded" : "material-symbols:dark-mode-rounded"}
						className="size-3 text-foreground"
					/>
				</Button>
			</div>
		</nav>
	)
}
