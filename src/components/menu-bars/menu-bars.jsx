"use client";

import React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

const MenuBars = ({ data }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </SheetTrigger>

      <SheetContent side="right" className="w-[250px]">
        <SheetHeader>
          <SheetTitle>Navigation Links</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-4">
          {data.map((e) => (
            <SheetClose key={e.id}>
              <Link
                href={e.link}
                className="text-lg text-start font-medium block py-2 px-4 rounded hover:bg-accent hover:text-accent-foreground"
              >
                {e.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuBars;
