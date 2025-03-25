import { render, screen } from '@testing-library/react'
import Header from '@/components/layout/Header'
import { CartProvider } from '@/context/CartContext'

jest.mock('@/context/CartContext', () => ({
  ...jest.requireActual('@/context/CartContext'),
  useCart: () => ({
    items: [
      { id: '1', quantity: 2 },
      { id: '2', quantity: 1 }
    ]
  })
}))

describe('Header', () => {
  it('renders header with logo and cart', () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    )
    
    expect(screen.getByText('GamerShop')).toBeInTheDocument()
    expect(screen.getByText('GamerShop')).toHaveAttribute('href', '/')
    
    const cartIcon = screen.getByAltText('Shopping Cart')
    expect(cartIcon).toBeInTheDocument()
    
    const cartLink = screen.getByRole('link', { name: /shopping cart/i })
    expect(cartLink).toHaveAttribute('href', '/cart')
  })

  it('shows correct item count badge', () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    )
    
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('does not show badge when cart is empty', () => {
    jest.spyOn(require('@/context/CartContext'), 'useCart').mockImplementation(() => ({
      items: []
    }))

    render(
      <CartProvider>
        <Header />
      </CartProvider>
    )
    
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})