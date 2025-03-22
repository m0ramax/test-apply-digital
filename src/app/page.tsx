"use client";

import { useGameFilters } from "../hooks/games/useGameFilters";
import GameFilter from "../components/games/GameFilter";
import GameList from "../components/games/GameList";

export default function Home() {
  const { genre } = useGameFilters();
  return (
    <>
      <GameFilter />
      <div className="px-4 md:px-8 lg:px-12">
        <div className="w-full max-w-[1440px] mx-auto my-8">
          <GameList genre={genre} />
        </div>
      </div>
    </>
  );
}
