"use client";

import { useTransition } from "react";
import { availableFilters } from "@/utils/endpoint";
import { useGameFilters } from "@/hooks/games/useGameFilters";

export default function GameFilter() {
  const [isPending, startTransition] = useTransition();
  const { genre, setGenre } = useGameFilters();

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = event.target.value;
    startTransition(() => {
      setGenre(selectedGenre === "All" ? null : selectedGenre);
    });
  };

  return (
    <div className="w-full px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <section className="grid gap-8 md:gap-12">
          <section className="grid gap-3 pt-8 md:pt-12">
            <h1 className="text-2xl md:text-4xl font-bold">Top Sellers</h1>
          </section>
          <div className="grid grid-cols-2 md:flex md:justify-end w-full items-center">
            <label
              htmlFor="genre"
              className="text-xl font-bold pl-4 md:pl-0 py-2 border-r border-border_contrast md:pr-6"
            >
              Genre
            </label>
            <select
              id="genre"
              value={genre?.toLowerCase() || "All"}
              onChange={handleGenreChange}
              disabled={isPending}
              className={`w-full md:w-auto text-xl py-4 pl-4 bg-transparent border-none outline-none cursor-pointer ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <option value="All">All</option>
              {availableFilters.map((genre) => (
                <option 
                  key={genre} 
                  value={genre.toLowerCase()}
                >
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </section>
      </div>
    </div>
  );
}