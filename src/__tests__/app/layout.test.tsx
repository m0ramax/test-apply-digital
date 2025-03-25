import { render, screen } from '@testing-library/react'
import RootLayout from '@/app/layout'

// Mock the components used in layout
jest.mock('@/components/layout/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>
  }
})

jest.mock('@/components/layout/Footer', () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>
  }
})

jest.mock('@/context/CartContext', () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-cart-provider">{children}</div>
  ),
}))

describe('RootLayout', () => {
  it('renders layout structure correctly', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const html = document.documentElement
    expect(html).toHaveAttribute('lang', 'en')

    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument()
    expect(screen.getByTestId('mock-cart-provider')).toBeInTheDocument()
  })

  it('applies Archivo font to body', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const body = document.body
    expect(body.className).toContain('archivo')
  })

  it('renders children in flex-grow container', () => {
    render(
      <RootLayout>
        <div data-testid="test-content">Test Content</div>
      </RootLayout>
    )

    const flexGrowContainer = screen.getByTestId('test-content').parentElement
    expect(flexGrowContainer).toHaveClass('flex-grow')
  })

  it('has correct flex layout structure', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const mainContainer = container.querySelector('.flex.min-h-screen.flex-col.w-full')
    expect(mainContainer).toBeInTheDocument()
  })

  it('maintains correct component order', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const children = container.querySelectorAll('[data-testid]')
    expect(children[0]).toHaveAttribute('data-testid', 'mock-cart-provider')
    expect(children[1]).toHaveAttribute('data-testid', 'mock-header')
    expect(children[2]).toHaveAttribute('data-testid', 'mock-footer')
  })
})