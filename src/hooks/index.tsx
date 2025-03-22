import { useState, useEffect } from "react";
import { gamesService } from "../services";
import { Game } from "../utils/endpoint";

export function useGames(initialGenre?: string) {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadGames = async (resetList: boolean = false) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const currentPage = resetList ? 1 : page;
      const data = await gamesService.getGames(currentPage, initialGenre);

      setGames((prevGames) =>
        resetList ? data.games : [...prevGames, ...data.games]
      );
      setHasMore(data.hasMore);
      setPage(currentPage + 1);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setGames([]);
    loadGames(true);
  }, [initialGenre]);

  return {
    games,
    hasMore,
    isLoading,
    error,
    loadMore: () => loadGames(false),
  };
}
