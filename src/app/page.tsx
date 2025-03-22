"use client";

import Card from "../components/Card";
import Loading from "../components/Loading";
import Filter from "../components/Filter";
import { useGames } from "../hooks";
import { useSearchParams } from "next/navigation";
import { useGameFilters } from "../hooks/useGameFilters";

function GameList({ genre }: { genre?: string }) {
  const { games, hasMore, isLoading, error, loadMore } = useGames(genre);

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }
  if (isLoading && games.length === 0) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      <Card game={games} />
      {hasMore && (
        <div className="flex justify-center my-8">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
export default function Home() {
  const { genre } = useGameFilters();
  return (
    <>
      <Filter />
      <div className="px-4 md:px-8 lg:px-12">
        <div className="w-full max-w-[1440px] mx-auto my-8">
          <GameList genre={genre} />
        </div>
      </div>
    </>
  );
}
