import { Game } from "../types";
import { CONFIG } from "../config";

export interface GamesResponse {
  games: Game[];
  hasMore: boolean;
  totalGames: number;
}

export const gamesService = {
  async getGames(page: number = 1, genre?: string): Promise<GamesResponse> {
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      if (genre) {
        params.append("genre", genre);
      }

      const response = await fetch(`${CONFIG.API.ENDPOINTS.GAMES}?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching games:", error);
      throw error;
    }
  },
};
