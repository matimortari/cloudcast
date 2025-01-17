"use client"

import { SearchIcon } from "lucide-react"
import { useState } from "react"
import { useGlobalContext, useGlobalContextUpdate } from "./context/GlobalContext"
import { Button } from "./ui/button"
import { Command, CommandInput } from "./ui/command"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"

export default function SearchDialog() {
	const { geoCodedList, inputValue, handleInput } = useGlobalContext()
	const { getClickedCityCoords } = useGlobalContextUpdate()
	const [hoveredIndex, setHoveredIndex] = useState<number>(0)
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="flex items-center justify-center bg-card hover:bg-muted" onClick={() => setOpen(true)}>
					<div className="flex flex-row items-center pr-24">
						<p className="text-sm text-muted-foreground">Search Locations...</p>
					</div>
					<SearchIcon size={15} className="text-foreground" />
				</Button>
			</DialogTrigger>

			<DialogContent className="scrollbar-hidden m-4 max-h-[90vh] rounded-2xl">
				<DialogTitle className="text-base text-muted-foreground">Search Locations</DialogTitle>
				<Command className="flex flex-grow flex-col">
					<CommandInput
						value={inputValue}
						onChangeCapture={handleInput}
						placeholder="Search for a city or location..."
					/>

					<div className="mt-2 flex flex-grow flex-col overflow-y-auto">
						<ul>
							{geoCodedList?.length === 0 && (
								<p className="p-2 text-base text-muted-foreground">No Results Avaliable :(</p>
							)}

							{geoCodedList?.map((item: any, index: number) => {
								const { country, admin1, name, latitude, longitude } = item
								return (
									<li
										key={index}
										onMouseEnter={() => setHoveredIndex(index)}
										onClick={() => {
											getClickedCityCoords(latitude, longitude, name)
											setOpen(false)
										}}
										className={`cursor-pointer rounded-2xl p-4 text-sm ${hoveredIndex === index ? "bg-muted" : ""}`}
									>
										{name}, {admin1 ? `${admin1},` : ""} {country}
									</li>
								)
							})}
						</ul>
					</div>
				</Command>
			</DialogContent>
		</Dialog>
	)
}
