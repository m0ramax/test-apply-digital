import { render, screen } from '@testing-library/react'
import Loading from '@/components/common/Loading'

describe('Loading', () => {
  it('renders loading skeleton cards', () => {
    const { container } = render(<Loading />)
    
    // Check grid container
    const grid = container.firstChild as HTMLElement
    expect(grid).toHaveClass('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3')

    // Check number of skeleton cards
    const skeletonCards = container.getElementsByClassName('animate-pulse')
    expect(skeletonCards).toHaveLength(9)
  })

  it('has correct skeleton structure', () => {
    const { container } = render(<Loading />)
    
    // Get first skeleton card
    const firstCard = container.querySelector('.animate-pulse')
    
    // Check card structure
    expect(firstCard).toHaveClass('flex flex-col items-center bg-slate-400')
    
    // Check image placeholder
    const imagePlaceholder = firstCard?.querySelector('.aspect-square')
    expect(imagePlaceholder).toHaveClass('bg-slate-300 rounded-lg')
    
    // Check text placeholders
    const textPlaceholders = firstCard?.querySelectorAll('.bg-slate-300')
    expect(textPlaceholders).toHaveLength(4) // Image + 3 text blocks
  })

  it('applies animation class', () => {
    const { container } = render(<Loading />)
    
    const animatedElements = container.getElementsByClassName('animate-pulse')
    expect(animatedElements.length).toBeGreaterThan(0)
    
    Array.from(animatedElements).forEach(element => {
      expect(element).toHaveClass('animate-pulse')
    })
  })
})