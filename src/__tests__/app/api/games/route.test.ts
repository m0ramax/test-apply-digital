import { GET } from '@/app/api/games/route'
import { allGames, delay } from '@/utils/endpoint'

// Mock the delay and games data
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

describe('Games API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns all games when no filters applied', async () => {
    const request = new Request('http://localhost:3000/api/games')
    const response = await GET(request)
    const data = await response.json()

    expect(data.games).toHaveLength(2)
    expect(data.totalGames).toBe(2)
    expect(data.hasMore).toBe(false)
  })

  it('filters games by genre case-insensitively', async () => {
    const request = new Request('http://localhost:3000/api/games?genre=ACTION')
    const response = await GET(request)
    const data = await response.json()

    expect(data.games).toHaveLength(1)
    expect(data.games[0].genre).toBe('Action')
    expect(data.totalGames).toBe(1)
  })

  it('handles pagination correctly', async () => {
    const request = new Request('http://localhost:3000/api/games?page=2')
    const response = await GET(request)
    const data = await response.json()

    expect(data.games).toHaveLength(0)
    expect(data.hasMore).toBe(false)
  })

  it('handles invalid page numbers', async () => {
    const request = new Request('http://localhost:3000/api/games?page=-1')
    const response = await GET(request)
    const data = await response.json()

    expect(data.games).toHaveLength(2)
    expect(delay).toHaveBeenCalledWith(2000)
  })

  it('returns empty array for non-existent genre', async () => {
    const request = new Request('http://localhost:3000/api/games?genre=nonexistent')
    const response = await GET(request)
    const data = await response.json()

    expect(data.games).toHaveLength(0)
    expect(data.totalGames).toBe(0)
    expect(data.hasMore).toBe(false)
  })

  it('applies both pagination and genre filter', async () => {
    const request = new Request('http://localhost:3000/api/games?genre=action&page=1')
    const response = await GET(request)
    const data = await response.json()

    expect(data.games).toHaveLength(1)
    expect(data.games[0].genre).toBe('Action')
    expect(data.totalGames).toBe(1)
  })
})