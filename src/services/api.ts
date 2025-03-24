// import { allGames, delay } from "../utils/endpoint";
// import { CONFIG } from "../config/";

// export async function getGames(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const genre = searchParams.get("genre");
//     let page = parseInt(searchParams.get("page") ?? "1");

//     let filteredGames = [...allGames];
//     if (genre) {
//       filteredGames = filteredGames.filter(
//         (game) => game.genre.toLowerCase() === genre.toLowerCase()
//       );
//     }

//     if (page < 1 || isNaN(page)) page = 1;

//     await delay(CONFIG.MOCK.DELAY);

//     const fromIndex = (page - 1) * CONFIG.PAGINATION.ITEMS_PER_PAGE;
//     const toIndex = page * CONFIG.PAGINATION.ITEMS_PER_PAGE;
//     const paginatedGames = filteredGames.slice(fromIndex, toIndex);

//     return Response.json({
//       games: paginatedGames,
//       hasMore: toIndex < filteredGames.length,
//       totalGames: filteredGames.length
//     });
//   } catch (error) {
//     console.error('API Error:', error);
//     return Response.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

import { allGames, delay } from "@/utils/endpoint";
import { CONFIG } from "@/config";
import { Game } from "@/types";

interface GamesResponse {
  games: Game[];
  hasMore: boolean;
  totalGames: number;
}

export async function GET(request: Request) {
  return getGames(request);
}

export async function getGames(request: Request) {
  try {
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

    await delay(CONFIG.MOCK.DELAY);

    const fromIndex = (page - 1) * CONFIG.PAGINATION.ITEMS_PER_PAGE;
    const toIndex = page * CONFIG.PAGINATION.ITEMS_PER_PAGE;
    const paginatedGames = filteredGames.slice(fromIndex, toIndex);

    return Response.json({
      games: paginatedGames,
      hasMore: toIndex < filteredGames.length,
      totalGames: filteredGames.length,
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
