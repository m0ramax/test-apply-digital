import { render, screen, fireEvent } from '@testing-library/react'
import GameFilter from '@/components/games/GameFilter'

jest.mock('@/hooks/games/useGameFilters', () => ({
  useGameFilters: () => ({
    genre: null,
    setGenre: jest.fn(),
  }),
}))

describe('GameFilter', () => {
  it('renders filter components', () => {
    render(<GameFilter />)
    expect(screen.getByText('Top Sellers')).toBeInTheDocument()
    expect(screen.getByText('Genre')).toBeInTheDocument()
  })

  it('handles genre selection', () => {
    render(<GameFilter />)
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'action' } })
    expect(select).toHaveValue('action')
  })
})