import { allGames, availableFilters, delay } from "../../../utils/endpoint";

const ITEMS_PER_PAGE = 12;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  let page = parseInt(searchParams.get("page") ?? "1");

  let filteredGames = [...allGames];

  if (genre) {
    filteredGames = filteredGames.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (page < 1 || isNaN(page)) page = 1;

  // Mock API delay
  await delay(2000);

  const fromIndex = (page - 1) * ITEMS_PER_PAGE;
  const toIndex = page * ITEMS_PER_PAGE;
  const paginatedGames = filteredGames.slice(fromIndex, toIndex);
  const hasMore = toIndex < filteredGames.length;

  return Response.json({
    games: paginatedGames,
    hasMore,
    totalGames: filteredGames.length,
  });
}
