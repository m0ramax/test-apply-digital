import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

jest.mock('@/hooks/games/useGameFilters', () => ({
  useGameFilters: () => ({
    genre: 'action'
  })
}))

jest.mock('@/components/games/GameFilter', () => {
  return function MockGameFilter() {
    return <div data-testid="mock-game-filter">Game Filter</div>
  }
})

jest.mock('@/components/games/GameList', () => {
  return function MockGameList({ genre }: { genre: string }) {
    return <div data-testid="mock-game-list">Game List - Genre: {genre}</div>
  }
})

describe('Home Page', () => {
  it('renders main components', () => {
    render(<Home />)
    
    expect(screen.getByTestId('mock-game-filter')).toBeInTheDocument()
    expect(screen.getByTestId('mock-game-list')).toBeInTheDocument()
  })

  it('passes genre to GameList', () => {
    render(<Home />)
    
    expect(screen.getByText('Game List - Genre: action')).toBeInTheDocument()
  })

  it('has correct layout structure', () => {
    const { container } = render(<Home />)
    
    const mainContainer = container.querySelector('.max-w-[1440px]')
    expect(mainContainer).toHaveClass('mx-auto my-8')
  })

  it('applies responsive padding', () => {
    const { container } = render(<Home />)
    
    const paddingContainer = container.querySelector('div')
    expect(paddingContainer).toHaveClass(
      'px-4 md:px-8 lg:px-12'
    )
  })
})