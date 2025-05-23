import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="m-4 flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="whitespace-nowrap text-muted-foreground">
        <p>© 2025 Matheus Mortari. All rights reserved.</p>
      </div>

      <div className="tems-center flex flex-row items-end gap-4 text-muted-foreground md:text-right">
        <Link
          href="https://github.com/matimortari"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="simple-icons:github" width={25} height={25} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/matheus-mortari-19rt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="simple-icons:linkedin" width={25} height={25} />
        </Link>
      </div>
    </footer>
  );
}
