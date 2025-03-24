import { render, screen } from '@testing-library/react'
import GameList from '@/components/games/GameList'
import { CartProvider } from '@/context/CartContext'

jest.mock('@/hooks/games/useGames', () => ({
  useGames: () => ({
    games: [
      {
        id: '1',
        name: 'Test Game',
        description: 'Test Description',
        price: 59.99,
        genre: 'Action',
        image: '/test-image.jpg',
        isNew: true
      }
    ],
    hasMore: false,
    isLoading: false,
    error: null,
    loadMore: jest.fn()
  })
}))

describe('GameList', () => {
  it('renders games list', () => {
    render(
      <CartProvider>
        <GameList />
      </CartProvider>
    )
    expect(screen.getByText('Test Game')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<GameList genre="action" />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })
})