import { getGames } from '@/services/api'
import { delay } from '@/utils/endpoint'
import { CONFIG } from '@/config'

// Mock the delay function
jest.mock('@/utils/endpoint', () => ({
  delay: jest.fn().mockResolvedValue(undefined),
  allGames: [
    {
      id: '1',
      name: 'Test Game 1',
      genre: 'Action',
      price: 59.99,
      image: '/test1.jpg',
      description: 'Test description 1',
      isNew: true
    },
    {
      id: '2',
      name: 'Test Game 2',
      genre: 'Adventure',
      price: 49.99,
      image: '/test2.jpg',
      description: 'Test description 2',
      isNew: false
    }
  ]
}))

describe('getGames API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns unfiltered games for base request', async () => {
    const request = new Request('http://test.com/api/games')
    const response = await getGames(request)
    const data = await response.json()

    expect(delay).toHaveBeenCalledWith(CONFIG.MOCK.DELAY)
    expect(data.games).toHaveLength(2)
    expect(data.hasMore).toBe(false)
    expect(data.totalGames).toBe(2)
  })

  it('filters games by genre', async () => {
    const request = new Request('http://test.com/api/games?genre=action')
    const response = await getGames(request)
    const data = await response.json()

    expect(data.games).toHaveLength(1)
    expect(data.games[0].genre).toBe('Action')
    expect(data.totalGames).toBe(1)
  })

  it('handles case-insensitive genre filtering', async () => {
    const request = new Request('http://test.com/api/games?genre=AcTiOn')
    const response = await getGames(request)
    const data = await response.json()

    expect(data.games).toHaveLength(1)
    expect(data.games[0].genre).toBe('Action')
  })

  it('handles invalid page numbers', async () => {
    const request = new Request('http://test.com/api/games?page=-1')
    const response = await getGames(request)
    const data = await response.json()

    expect(data.games).toBeDefined()
    expect(data.games).toHaveLength(2)
  })

  it('handles non-numeric page parameter', async () => {
    const request = new Request('http://test.com/api/games?page=invalid')
    const response = await getGames(request)
    const data = await response.json()

    expect(data.games).toBeDefined()
    expect(data.games).toHaveLength(2)
  })

  it('handles error cases', async () => {
    const mockError = new Error('Test error')
    jest.spyOn(require('@/utils/endpoint'), 'delay').mockRejectedValue(mockError)

    const request = new Request('http://test.com/api/games')
    const response = await getGames(request)
    
    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe('Internal Server Error')
  })

  it('handles pagination correctly', async () => {
    const manyGames = Array(CONFIG.PAGINATION.ITEMS_PER_PAGE + 5)
      .fill(null)
      .map((_, i) => ({
        id: `${i}`,
        name: `Game ${i}`,
        genre: 'Action',
        price: 59.99,
        image: '/test.jpg',
        description: `Description ${i}`,
        isNew: true
      }))

    jest.spyOn(require('@/utils/endpoint'), 'allGames', 'get')
      .mockReturnValue(manyGames)

    const request = new Request('http://test.com/api/games?page=2')
    const response = await getGames(request)
    const data = await response.json()

    expect(data.games.length).toBeLessThanOrEqual(CONFIG.PAGINATION.ITEMS_PER_PAGE)
    expect(data.hasMore).toBe(false)
  })
})