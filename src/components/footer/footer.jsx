"use client";

import React from "react";
import Image from "next/image";

const leftLinks = [
  { href: "https://redux.js.org/", label: "Redux" },
  { href: "https://mobx.js.org/README.html", label: "MobX" },
  { href: "https://jotai.org/", label: "Jotai" },
  { href: "https://zustand-demo.pmnd.rs/", label: "Zustand" },
];

const rightLinks = [
  {
    href: "https://nextjs.org/",
    label: "Next.js",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    href: "https://vercel.com/",
    label: "Vercel",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    href: "https://ui.shadcn.com/",
    label: "Shadcn/ui",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border pt-6 mt-10 text-sm text-muted-foreground">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 px-4 pb-6">
        <div className="flex gap-6 flex-wrap justify-center md:justify-start">
          {leftLinks.map((e) => (
            <a
              key={e.label}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4 transition-colors"
            >
              {e.label}
            </a>
          ))}
        </div>

        <div className="flex gap-4 items-center flex-wrap justify-center md:justify-end">
          {rightLinks.map((e) => (
            <a
              key={e.label}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline underline-offset-4"
            >
              {e.icon}
              {e.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
