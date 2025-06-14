import React from "react";
import Link from "next/link";

const data = [
  { id: 1, name: "Redux", link: "/redux-toolkit" },
  { id: 2, name: "MobX", link: "/mobx" },
  { id: 3, name: "Jotai", link: "/jotai" },
  { id: 4, name: "Zustand", link: "/zustand" },
];

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="text-center py-14">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-400">
          Your Guide to React State Managers
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Redux? Jotai? Zustand? Explore them all and choose what fits your
          project best.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 max-w-md w-full px-2">
        {data.map((e) => (
          <Link
            key={e.id}
            href={e.link}
            className="aspect-square group relative border border-border rounded-2xl shadow-sm bg-card text-foreground hover:shadow-md hover:border-primary transition-all duration-300 flex items-center justify-center"
          >
            <span className="text-lg font-semibold group-hover:text-primary transition-colors">
              {e.name}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;
