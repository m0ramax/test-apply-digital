import { CONFIG } from '@/config'

describe('CONFIG', () => {
  it('has correct API configuration', () => {
    expect(CONFIG.API.ENDPOINTS.GAMES).toBe('/api/games')
  })

  it('has correct pagination settings', () => {
    expect(CONFIG.PAGINATION.ITEMS_PER_PAGE).toBe(12)
  })

  it('has correct mock settings', () => {
    expect(CONFIG.MOCK.DELAY).toBe(2000)
  })

  it('is a readonly object', () => {
    expect(() => {
      // @ts-expect-error - Testing runtime immutability
      CONFIG.API.ENDPOINTS.GAMES = '/different-path'
    }).toThrow()
  })

  it('maintains correct structure', () => {
    expect(CONFIG).toEqual({
      API: {
        BASE_URL: process.env.NEXT_PUBLIC_API_URL,
        ENDPOINTS: {
          GAMES: '/api/games',
        },
      },
      PAGINATION: {
        ITEMS_PER_PAGE: 12,
      },
      MOCK: {
        DELAY: 2000,
      },
    })
  })
})