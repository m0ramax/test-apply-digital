"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { availableFilters } from "../utils/endpoint";
import { useTransition } from "react";
import { useGameFilters } from "../hooks/useGameFilters";

export default function Filter() {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const currentGenre = searchParams.get("genre");
  const [isPending, startTransition] = useTransition();
  // // const [isLoading, setIsLoading] = useState(false);

  // const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const genre = event.target.value;
  //   startTransition(() => {
  //     if (genre === "All") {
  //       router.push("/")
  //     } else {
  //       router.push(`/?genre=${genre.toLowerCase()}`);
  //     }
  //   });
  // };
  const { genre, setGenre } = useGameFilters();

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = event.target.value;
    setGenre(selectedGenre === "All" ? null : selectedGenre);
  };

  return (
    <div className="w-full bg-slate-700">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-4">
        <div className="flex items-center gap-2">
          <label htmlFor="genre" className="text-white font-medium">
            Filter by Genre
          </label>
          <div className="relative">
            <select
              id="genre"
              value={genre?.toLowerCase() || "All"}
              onChange={handleGenreChange}
              disabled={isPending}
              className={`px-4 py-2 rounded-lg bg-slate-600 text-white border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <option value="All">All Games</option>
              {availableFilters.map((genre) => (
                <option key={genre} value={genre.toLowerCase()}>
                  {genre}
                </option>
              ))}
            </select>
            {isPending && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
