"use client";

import { useCart } from "../../hooks/cart/useCart";
import { CartItem } from "../../components/cart/CartItem";
import { CartSummary } from "../../components/cart/CartSummary";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    console.log("checkout clicked");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="text-center py-8">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link
            href="/"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        ))}
      </div>
      <CartSummary total={total} onCheckout={handleCheckout} />
    </div>
  );
}
