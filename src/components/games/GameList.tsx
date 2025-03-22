"use client";

import { useGames } from "../../hooks/games/useGames";
import GameCard from "./GameCard";
import Loading from "../common/Loading";

interface GameListProps {
  genre?: string;
}

export default function GameList({ genre }: GameListProps) {
  const { games, hasMore, isLoading, error, loadMore } = useGames(genre);

  if (error) {
    return (
      <div className="text-red-500 text-center py-8 rounded-lg bg-red-50 border border-red-200">
        <p className="font-semibold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm text-red-600 hover:text-red-700 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (isLoading && games.length === 0) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
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
