import { gamesService } from '@/services/games'
import { CONFIG } from '@/config'

describe('Games Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn()
  })

  const mockGamesResponse = {
    games: [
      {
        id: '1',
        name: 'Test Game',
        description: 'Test Description',
        price: 59.99,
        genre: 'Action',
        image: '/test.jpg',
        isNew: true
      }
    ],
    hasMore: false,
    totalGames: 1
  }

  it('fetches games with default parameters', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockGamesResponse)
    })

    const result = await gamesService.getGames()

    expect(global.fetch).toHaveBeenCalledWith(
      `${CONFIG.API.ENDPOINTS.GAMES}?page=1`
    )
    expect(result).toEqual(mockGamesResponse)
  })

  it('fetches games with genre filter', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockGamesResponse)
    })

    await gamesService.getGames(1, 'action')

    expect(global.fetch).toHaveBeenCalledWith(
      `${CONFIG.API.ENDPOINTS.GAMES}?page=1&genre=action`
    )
  })

  it('handles pagination parameters', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockGamesResponse)
    })

    await gamesService.getGames(2)

    expect(global.fetch).toHaveBeenCalledWith(
      `${CONFIG.API.ENDPOINTS.GAMES}?page=2`
    )
  })

  it('throws error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Server Error'
    })

    await expect(gamesService.getGames()).rejects.toThrow('Failed to fetch games')
  })

  it('throws error when network request fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    await expect(gamesService.getGames()).rejects.toThrow('Network error')
  })

  it('handles malformed JSON response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(new Error('Invalid JSON'))
    })

    await expect(gamesService.getGames()).rejects.toThrow('Invalid JSON')
  })

  it('handles all query parameters together', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockGamesResponse)
    })

    await gamesService.getGames(2, 'action')

    expect(global.fetch).toHaveBeenCalledWith(
      `${CONFIG.API.ENDPOINTS.GAMES}?page=2&genre=action`
    )
  })
})