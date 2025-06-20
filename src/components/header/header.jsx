"use client";

import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { usePathname } from "next/navigation";
import MenuBars from "../menu-bars/menu-bars";

const links = [
  {
    id: 1,
    name: "Redux Toolkit",
    link: "/redux-toolkit",
  },
  {
    id: 2,
    name: "Mobx",
    link: "/mobx",
  },
  {
    id: 3,
    name: "Jotai",
    link: "/jotai",
  },
  {
    id: 4,
    name: "Zustand",
    link: "/zustand",
  },
];

const Header = () => {
  const pathname = usePathname();

  const isActive = (link) => pathname === link;
  return (
    <header className="w-full px-4 mx-auto border-b border-border py-6">
      <nav className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-lg font-semibold text-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
              clipRule="evenodd"
            />
          </svg>
          <Link href="/">Todo Lists</Link>
        </div>

        <ul className="hidden md:flex flex-wrap justify-center gap-10 text-[18px] text-muted-foreground">
          {links.map((e) => {
            return (
              <li key={e.id}>
                <Link
                  href={e.link}
                  className={` pb-0.5 transition-all hover:text-foreground hover:border-black hover:border-b dark:border-white  ${
                    isActive(e.link)
                      ? "text-foreground border-b-1 border-black"
                      : "text-muted-foreground"
                  }`}
                >
                  {e.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://github.com/Joseph-RY"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-input bg-accent text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="size-5"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>

          <MenuBars data={links} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
