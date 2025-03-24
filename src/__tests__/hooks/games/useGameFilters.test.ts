import { renderHook } from '@testing-library/react'
import { useGameFilters } from '@/hooks/games/useGameFilters'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}))

describe('useGameFilters', () => {
  // Setup common mocks
  const mockPush = jest.fn()
  const mockGet = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    ;(useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet
    })
  })

  it('should return undefined genre when no genre in URL', () => {
    mockGet.mockReturnValue(null)
    
    const { result } = renderHook(() => useGameFilters())
    
    expect(result.current.genre).toBeUndefined()
  })

  it('should return genre from URL', () => {
    mockGet.mockReturnValue('action')
    
    const { result } = renderHook(() => useGameFilters())
    
    expect(result.current.genre).toBe('action')
  })

  it('should navigate to home when clearing genre', () => {
    const { result } = renderHook(() => useGameFilters())
    
    result.current.setGenre(null)
    
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('should navigate with genre parameter', () => {
    const { result } = renderHook(() => useGameFilters())
    
    result.current.setGenre('Action')
    
    expect(mockPush).toHaveBeenCalledWith('/?genre=action')
  })

  it('should convert genre to lowercase when setting', () => {
    const { result } = renderHook(() => useGameFilters())
    
    result.current.setGenre('ACTION')
    
    expect(mockPush).toHaveBeenCalledWith('/?genre=action')
  })
})