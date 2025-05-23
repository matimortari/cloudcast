"use client";

import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/src/components/context/global-context";
import { Button } from "@/src/components/ui/button";
import { Command, CommandInput } from "@/src/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export default function SearchDialog() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { getClickedCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center bg-card hover:bg-muted"
        >
          <div className="flex flex-row items-center pr-16 md:pr-32">
            <p
              title="Search Locations for Weather"
              className="text-sm text-muted-foreground"
            >
              Search Locations...
            </p>
          </div>
          <SearchIcon size={15} className="text-foreground" />
        </Button>
      </DialogTrigger>

      <DialogContent className="m-4 max-h-[90vh] rounded-2xl">
        <DialogTitle className="font-semibold">Search Locations</DialogTitle>
        <Command className="flex flex-grow flex-col">
          <CommandInput
            onChangeCapture={handleInput}
            value={inputValue}
            placeholder="Search for a city or location..."
          />

          <div className="dialog-scrollbar mt-2 flex max-h-[50vh] flex-grow flex-col overflow-y-auto">
            <ul>
              {geoCodedList?.length === 0 && (
                <p className="p-2 text-muted-foreground">
                  No Results Available :(
                </p>
              )}

              {geoCodedList?.map((item: any, index: number) => {
                const { country, admin1, name, latitude, longitude } = item;
                return (
                  <li
                    key={`${name}-${latitude}-${longitude}`}
                    className="list-none"
                  >
                    <button
                      onClick={() => {
                        getClickedCityCoords(latitude, longitude, name);
                        setOpen(false);
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      className={`w-full rounded-2xl p-4 text-left text-sm transition-all ${
                        hoveredIndex === index ? "bg-muted" : ""
                      }`}
                    >
                      {name}, {admin1 ? `${admin1},` : ""} {country}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
