import { Icon } from "@iconify/react"
import Link from "next/link"

export default function Footer() {
	return (
		<footer className="m-4 flex flex-col items-center justify-between gap-4 md:flex-row">
			<div className="text-muted-foreground">
				<p>© 2025 Matheus Mortari. All rights reserved.</p>
			</div>

			<div className="flex flex-row gap-4 text-sm text-muted-foreground md:text-right">
				<div className="flex flex-row items-end gap-2 md:items-center">
					<Link href="https://github.com/matimortari" target="_blank" aria-label="GitHub">
						<Icon icon="simple-icons:github" className="icon size-6" />
					</Link>
					<Link href="https://www.linkedin.com/in/matheus-mortari-19rt" target="_blank" aria-label="LinkedIn">
						<Icon icon="simple-icons:linkedin" className="icon size-6" />
					</Link>
				</div>
			</div>
		</footer>
	)
}
