import { getGames } from "@/services/api";

export async function GET(request: Request) {
  return getGames(request);
}
