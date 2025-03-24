import { useState, useEffect, useCallback } from "react";
import { Game } from "@/types";
import { gamesService } from "@/services/games";

export function useGames(initialGenre?: string) {
  const [games, setGames] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchGames = useCallback(async (currentPage: number, isLoadMore = false) => {
    try {
      setIsLoading(true);
      const data = await gamesService.getGames(currentPage, initialGenre);

      setGames((prev) => (isLoadMore ? [...prev, ...data.games] : data.games));
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load games");
    } finally {
      setIsLoading(false);
    }
  }, [initialGenre]);

  useEffect(() => {
    setGames([]); 
    setPage(1);
    fetchGames(1);
  }, [fetchGames, initialGenre]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGames(nextPage, true);
    }
  };

  return { games, hasMore, isLoading, error, loadMore };
}
