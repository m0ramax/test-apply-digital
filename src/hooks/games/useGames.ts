import { useState, useEffect } from "react";
import { Game } from "../../types";
import { gamesService } from "../../services/games.service";

export function useGames(initialGenre?: string) {
  const [games, setGames] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchGames = async (currentPage: number, isLoadMore = false) => {
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
  };

  useEffect(() => {
    setGames([]); // Clear games when genre changes
    setPage(1); // Reset page
    fetchGames(1);
  }, [initialGenre]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGames(nextPage, true);
    }
  };

  return { games, hasMore, isLoading, error, loadMore };
}
