import { GET } from '@/app/api/games/route'
import { getGames } from '@/services/api'
import { CONFIG } from '@/config'

// Mock the api service
jest.mock('@/services/api', () => ({
  getGames: jest.fn()
}))

describe('Games API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls getGames service with the request', async () => {
    const mockRequest = new Request('http://localhost:3000/api/games')
    const mockResponse = new Response(JSON.stringify({ data: 'test' }))
    
    ;(getGames as jest.Mock).mockResolvedValue(mockResponse)
    const response = await GET(mockRequest)

    expect(getGames).toHaveBeenCalledWith(mockRequest)
    expect(response).toBe(mockResponse)
  })

  it('handles requests with genre parameter', async () => {
    const mockRequest = new Request('http://localhost:3000/api/games?genre=action')
    const mockResponse = new Response(JSON.stringify({ games: [], totalGames: 0 }))
    
    ;(getGames as jest.Mock).mockResolvedValue(mockResponse)
    const response = await GET(mockRequest)

    expect(getGames).toHaveBeenCalledWith(mockRequest)
    const data = await response.json()
    expect(data).toEqual({ games: [], totalGames: 0 })
  })

  it('handles requests with page parameter', async () => {
    const mockRequest = new Request('http://localhost:3000/api/games?page=2')
    const mockResponse = new Response(JSON.stringify({ games: [], hasMore: false }))
    
    ;(getGames as jest.Mock).mockResolvedValue(mockResponse)
    const response = await GET(mockRequest)

    expect(getGames).toHaveBeenCalledWith(mockRequest)
    const data = await response.json()
    expect(data).toEqual({ games: [], hasMore: false })
  })

  it('handles invalid URLs', async () => {
    const mockRequest = new Request('invalid-url')
    const mockResponse = new Response(
      JSON.stringify({ error: 'Internal Server Error' }), 
      { status: 500 }
    )
    
    ;(getGames as jest.Mock).mockResolvedValue(mockResponse)
    const response = await GET(mockRequest)

    expect(getGames).toHaveBeenCalledWith(mockRequest)
    expect(response.status).toBe(500)
  })

  it('passes through any errors from the service', async () => {
    const mockRequest = new Request('http://localhost:3000/api/games')
    const mockError = new Error('Test error')
    
    ;(getGames as jest.Mock).mockRejectedValue(mockError)

    await expect(GET(mockRequest)).rejects.toThrow('Test error')
  })

  it('handles malformed JSON responses', async () => {
    const mockRequest = new Request('http://localhost:3000/api/games')
    const mockResponse = new Response('invalid json')
    
    ;(getGames as jest.Mock).mockResolvedValue(mockResponse)
    const response = await GET(mockRequest)

    expect(getGames).toHaveBeenCalledWith(mockRequest)
    expect(response).toBe(mockResponse)
  })
})