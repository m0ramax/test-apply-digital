import { render, screen } from '@testing-library/react'
import { OrderSummary } from '@/components/cart/OrderSummary'

const mockItems = [
  {
    id: '1',
    name: 'The Last of Us Part I',
    description: 'Action game',
    price: 59.99,
    genre: 'Action',
    image: '/image1.jpg',
    isNew: true,
    quantity: 2
  },
  {
    id: '2',
    name: 'God of War Ragnarök',
    description: 'Adventure game',
    price: 69.99,
    genre: 'Adventure',
    image: '/image2.jpg',
    isNew: false,
    quantity: 1
  }
]

const total = mockItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

describe('OrderSummary', () => {
  it('renders order summary correctly', () => {
    render(<OrderSummary items={mockItems} total={total} />)
    
    // Check title and items count
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText('3 items')).toBeInTheDocument()
    
    // Check individual items
    mockItems.forEach((item) => {
      expect(screen.getByText(`${item.name} (${item.quantity}x)`)).toBeInTheDocument()
      expect(screen.getByText(`$${(item.price * item.quantity).toFixed(2)}`)).toBeInTheDocument()
    })
    
    // Check total
    expect(screen.getByText('Order Total')).toBeInTheDocument()
    expect(screen.getByText(`$${total.toFixed(2)}`)).toBeInTheDocument()
  })

  it('renders empty order summary', () => {
    render(<OrderSummary items={[]} total={0} />)
    
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText('0 items')).toBeInTheDocument()
    expect(screen.getByText('$0.00')).toBeInTheDocument()
  })
})