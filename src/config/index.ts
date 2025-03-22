export const CONFIG = {
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
    ENDPOINTS: {
      GAMES: "/api/games",
    },
  },
  PAGINATION: {
    ITEMS_PER_PAGE: 12,
  },
  MOCK: {
    DELAY: 2000,
  },
} as const;
