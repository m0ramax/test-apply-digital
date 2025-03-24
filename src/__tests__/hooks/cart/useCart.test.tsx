import { renderHook, act } from '@testing-library/react'
import { useCart } from '@/hooks/cart/useCart'
import { CartProvider } from '@/context/CartContext'
import { ReactNode } from 'react'

const mockGame = {
  id: '1',
  name: 'Test Game',
  description: 'Test Description',
  price: 59.99,
  genre: 'Action',
  image: '/test-image.jpg',
  isNew: true
}

describe('useCart', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  )

  beforeEach(() => {
    localStorage.clear()
  })

  it('throws error when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      renderHook(() => useCart())
    }).toThrow('useCart must be used within a CartProvider')
    
    consoleSpy.mockRestore()
  })

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    expect(result.current.items).toHaveLength(0)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('handles adding item to cart', async () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    await act(async () => {
      await result.current.addToCart(mockGame)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0]).toEqual({ ...mockGame, quantity: 1 })
  })

  it('handles adding duplicate item to cart', async () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    await act(async () => {
      await result.current.addToCart(mockGame)
      await result.current.addToCart(mockGame)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })

  it('handles removing item from cart', async () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    await act(async () => {
      await result.current.addToCart(mockGame)
      await result.current.removeFromCart(mockGame.id)
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('handles removing non-existent item', async () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    await act(async () => {
      await result.current.removeFromCart('non-existent-id')
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.error).toBeNull()
  })

  it('handles updating item quantity', async () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    await act(async () => {
      await result.current.addToCart(mockGame)
      await result.current.updateQuantity(mockGame.id, 3)
    })

    expect(result.current.items[0].quantity).toBe(3)
  })

  it('handles updating non-existent item quantity', async () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    await act(async () => {
      await result.current.updateQuantity('non-existent-id', 5)
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.error).toBeDefined()
  })

  it('removes item when quantity is set to zero', async () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    await act(async () => {
      await result.current.addToCart(mockGame)
      await result.current.updateQuantity(mockGame.id, 0)
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('handles clearing cart', async () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    await act(async () => {
      await result.current.addToCart(mockGame)
      await result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('persists cart in localStorage', async () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    await act(async () => {
      await result.current.addToCart(mockGame)
    })

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    expect(storedCart).toHaveLength(1)
    expect(storedCart[0]).toEqual({ ...mockGame, quantity: 1 })
  })

  it('loads initial state from localStorage', () => {
    const initialCart = [{ ...mockGame, quantity: 2 }]
    localStorage.setItem('cart', JSON.stringify(initialCart))

    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual(initialCart)
  })
})