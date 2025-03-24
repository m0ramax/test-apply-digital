import { render, screen, fireEvent } from '@testing-library/react'
import { CartItem } from '@/components/cart/CartItem'

const mockItem = {
  id: '1',
  name: 'Test Game',
  description: 'Test Description',
  price: 59.99,
  genre: 'Action',
  image: '/test-image.jpg',
  isNew: true,
  quantity: 1
}

describe('CartItem', () => {
  const mockRemove = jest.fn()

  it('renders cart item correctly', () => {
    render(<CartItem item={mockItem} onRemove={mockRemove} />)
    expect(screen.getByText(mockItem.name)).toBeInTheDocument()
    expect(screen.getByText(`$${mockItem.price.toFixed(2)}`)).toBeInTheDocument()
  })

  it('calls remove function when remove button is clicked', () => {
    render(<CartItem item={mockItem} onRemove={mockRemove} />)
    const removeButton = screen.getByLabelText('Remove item')
    fireEvent.click(removeButton)
    expect(mockRemove).toHaveBeenCalledWith(mockItem.id)
  })
})