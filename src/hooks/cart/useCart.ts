import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Game } from "../../types";

interface CartOperationResult {
  success: boolean;
  error?: string;
}

export function useCart() {
  const context = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { items, addToCart, removeFromCart, updateQuantity, clearCart } =
    context;

  const handleRemoveFromCart = (id: string): Promise<CartOperationResult> => {
    setIsLoading(true);
    setError(null);

    try {
      removeFromCart(id);
      return Promise.resolve({ success: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to remove item";
      setError(errorMessage);
      return Promise.resolve({ success: false, error: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (game: Game): Promise<CartOperationResult> => {
    setIsLoading(true);
    setError(null);
    try {
      addToCart(game);
      return Promise.resolve({ success: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add item";
      setError(errorMessage);
      return Promise.resolve({ success: false, error: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCart = (): Promise<CartOperationResult> => {
    setIsLoading(true);
    setError(null);

    try {
      clearCart();
      return Promise.resolve({ success: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to clear cart";
      setError(errorMessage);
      return Promise.resolve({ success: false, error: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = (
    id: string,
    quantity: number
  ): Promise<CartOperationResult> => {
    setIsLoading(true);
    setError(null);

    try {
      updateQuantity(id, quantity);
      return Promise.resolve({ success: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update quantity";
      setError(errorMessage);
      return Promise.resolve({ success: false, error: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    items,
    isLoading,
    error,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    clearCart: handleClearCart,
    updateQuantity: handleUpdateQuantity,
  };
}
