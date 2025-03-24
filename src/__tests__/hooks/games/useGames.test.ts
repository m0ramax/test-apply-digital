import { renderHook, act } from "@testing-library/react";
import { useGames } from "@/hooks/games/useGames";
import { gamesService } from "@/services/games";

// Mock the games service
jest.mock("@/services/games.service", () => ({
  gamesService: {
    getGames: jest.fn(),
  },
}));

const mockGamesResponse = {
  games: [
    {
      id: "1",
      name: "Test Game",
      description: "Test Description",
      price: 59.99,
      genre: "Action",
      image: "/test-image.jpg",
      isNew: true,
    },
  ],
  hasMore: true,
  totalGames: 1,
};

describe("useGames", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default success response
    (gamesService.getGames as jest.Mock).mockResolvedValue(mockGamesResponse);
  });

  it("should fetch games on initial render", async () => {
    const { result } = renderHook(() => useGames());

    // Initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.games).toHaveLength(0);

    // Wait for the fetch to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check final state
    expect(result.current.isLoading).toBe(false);
    expect(result.current.games).toEqual(mockGamesResponse.games);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("should handle genre filter changes", async () => {
    const { result, rerender } = renderHook((props) => useGames(props?.genre), {
      initialProps: { genre: "action" },
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify service was called with genre
    expect(gamesService.getGames).toHaveBeenCalledWith(1, "action");

    // Change genre
    rerender({ genre: "adventure" });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify service was called with new genre
    expect(gamesService.getGames).toHaveBeenCalledWith(1, "adventure");
  });

  it("should load more games when loadMore is called", async () => {
    const { result } = renderHook(() => useGames());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Mock second page response
    const secondPageResponse = {
      games: [{ ...mockGamesResponse.games[0], id: "2" }],
      hasMore: false,
      totalGames: 2,
    };
    (gamesService.getGames as jest.Mock).mockResolvedValueOnce(
      secondPageResponse
    );

    // Call loadMore
    await act(async () => {
      result.current.loadMore();
    });

    // Should have both pages of games
    expect(result.current.games).toHaveLength(2);
    expect(result.current.hasMore).toBe(false);
  });

  it("should handle errors", async () => {
    const errorMessage = "Failed to fetch games";
    (gamesService.getGames as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useGames());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.isLoading).toBe(false);
  });

  it("should not load more if already loading", async () => {
    const { result } = renderHook(() => useGames());

    // Trigger loadMore while loading
    act(() => {
      result.current.loadMore();
    });

    // Service should only be called once (initial load)
    expect(gamesService.getGames).toHaveBeenCalledTimes(1);
  });

  it("should not load more if hasMore is false", async () => {
    (gamesService.getGames as jest.Mock).mockResolvedValueOnce({
      ...mockGamesResponse,
      hasMore: false,
    });

    const { result } = renderHook(() => useGames());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.loadMore();
    });

    // Service should only be called once (initial load)
    expect(gamesService.getGames).toHaveBeenCalledTimes(1);
  });
});
