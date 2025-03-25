import { render, screen, fireEvent } from '@testing-library/react'
import GameCard from '@/components/games/GameCard'
import { CartProvider } from '@/context/CartContext'

const mockGame = {
  id: '1',
  name: 'Test Game',
  description: 'Test Description',
  price: 59.99,
  genre: 'Action',
  image: '/test-image.jpg',
  isNew: true
}

describe('GameCard', () => {
  const renderGameCard = () => {
    return render(
      <CartProvider>
        <GameCard game={mockGame} />
      </CartProvider>
    )
  }

  it('renders game information correctly', () => {
    renderGameCard()
    expect(screen.getByText(mockGame.name)).toBeInTheDocument()
    expect(screen.getByText(mockGame.description)).toBeInTheDocument()
    expect(screen.getByText(`$${mockGame.price.toFixed(2)}`)).toBeInTheDocument()
    expect(screen.getByText(mockGame.genre)).toBeInTheDocument()
  })

  it('shows New tag when game is new', () => {
    renderGameCard()
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('does not show New tag when game is not new', () => {
    render(
      <CartProvider>
        <GameCard game={{ ...mockGame, isNew: false }} />
      </CartProvider>
    )
    expect(screen.queryByText('New')).not.toBeInTheDocument()
  })

  it('renders game image correctly', () => {
    renderGameCard()
    const image = screen.getByAltText(mockGame.name)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', mockGame.name)
  })

  it('handles add to cart button interaction', () => {
    renderGameCard()
    const addButton = screen.getByRole('button', { name: /add to cart/i })
    expect(addButton).toBeInTheDocument()
    
    fireEvent.click(addButton)
    expect(addButton).not.toBeDisabled()
  })

  it('applies correct styling classes', () => {
    const { container } = renderGameCard()
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('border-[0.5px] border-primary-base rounded-2xl')
  })
})