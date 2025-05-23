"use client";

import SearchDialog from "@/src/components/search-dialog";
import { Button } from "@/src/components/ui/button";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const themeIcon = !mounted
    ? null
    : theme === "light"
      ? "material-symbols:dark-mode-rounded"
      : "material-symbols:light-mode-rounded";

  const themeTitle = !mounted
    ? "Toggle theme"
    : `Switch to ${theme === "light" ? "dark" : "light"} mode`;

  return (
    <nav className="mx-6 flex items-center justify-between py-2 md:mx-20">
      <Link href="/" className="flex flex-row items-center justify-start gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={35}
          height={35}
          className="icon"
        />
        <span className="hidden text-xl md:block">CloudCast</span>
      </Link>

      <div className="flex items-center gap-2">
        <SearchDialog />

        <Button
          onClick={handleThemeToggle}
          title={themeTitle}
          className="flex items-center justify-center bg-card hover:bg-muted"
        >
          {themeIcon && (
            <Icon
              icon={themeIcon}
              width={20}
              height={20}
              className="text-muted-foreground"
            />
          )}
        </Button>
      </div>
    </nav>
  );
}
