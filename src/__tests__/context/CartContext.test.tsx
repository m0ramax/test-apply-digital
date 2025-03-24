import { render, renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";

const mockGame = {
  id: "1",
  name: "Test Game",
  description: "Test Description",
  price: 59.99,
  genre: "Action",
  image: "/test-image.jpg",
  isNew: true,
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it("initializes with empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
  });

  it("adds item to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockGame);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({ ...mockGame, quantity: 1 });
  });

  it("increases quantity of existing item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockGame);
      result.current.addToCart(mockGame);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it("removes item from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockGame);
      result.current.removeFromCart(mockGame.id);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("updates item quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockGame);
      result.current.updateQuantity(mockGame.id, 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
  });

  it("removes item when quantity is less than 1", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockGame);
      result.current.updateQuantity(mockGame.id, 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("clears cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockGame);
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("persists cart in localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockGame);
    });

    const savedCart = JSON.parse(
      localStorage.getItem("game-store-cart") || "[]"
    );
    expect(savedCart).toHaveLength(1);
    expect(savedCart[0]).toEqual({ ...mockGame, quantity: 1 });
  });

  it("loads cart from localStorage on init", () => {
    const initialCart = [{ ...mockGame, quantity: 2 }];
    localStorage.setItem("game-store-cart", JSON.stringify(initialCart));

    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual(initialCart);
  });
});
