import { render, screen, fireEvent } from '@testing-library/react'
import CartPage from '@/app/cart/page'
import { useCart } from '@/hooks/cart/useCart'

// Mock the useCart hook
jest.mock('@/hooks/cart/useCart', () => ({
  useCart: jest.fn()
}))

const mockItems = [
  {
    id: '1',
    name: 'Test Game',
    description: 'Test Description',
    price: 59.99,
    genre: 'Action',
    image: '/test-image.jpg',
    isNew: true,
    quantity: 2
  }
]

describe('CartPage', () => {
  const mockRemoveFromCart = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useCart as jest.Mock).mockReturnValue({
      items: mockItems,
      removeFromCart: mockRemoveFromCart
    })
  })

  it('renders cart with items', () => {
    render(<CartPage />)
    
    expect(screen.getByText('Your Cart')).toBeInTheDocument()
    expect(screen.getByText('2 items')).toBeInTheDocument()
    expect(screen.getByText('Test Game')).toBeInTheDocument()
    expect(screen.getByText('Back to Catalog')).toBeInTheDocument()
  })

  it('shows empty cart message when no items', () => {
    ;(useCart as jest.Mock).mockReturnValue({
      items: [],
      removeFromCart: mockRemoveFromCart
    })

    render(<CartPage />)
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('calculates total correctly', () => {
    render(<CartPage />)
    
    // 59.99 * 2 = 119.98
    expect(screen.getByText('$119.98')).toBeInTheDocument()
  })

  it('handles checkout button click', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    render(<CartPage />)
    
    const checkoutButton = screen.getByText('Checkout')
    fireEvent.click(checkoutButton)
    
    expect(consoleSpy).toHaveBeenCalledWith('checkout clicked')
  })

  it('navigates back to catalog', () => {
    render(<CartPage />)
    
    const backLink = screen.getByText('Back to Catalog')
    expect(backLink).toHaveAttribute('href', '/')
  })

  it('removes item from cart', () => {
    render(<CartPage />)
    
    const removeButton = screen.getByLabelText('Remove item')
    fireEvent.click(removeButton)
    
    expect(mockRemoveFromCart).toHaveBeenCalledWith('1')
  })
})