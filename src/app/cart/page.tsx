"use client";

import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart } = useCart();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow"
          >
            <div className="relative w-24 h-24">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600">{item.genre}</p>
              <p className="font-semibold">
                ${item.price}*{item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-500 hover:text-red-700"
              aria-label="Remove item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  //   strokeLinecap="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
        <div className="text-right">
          <p className="text-lg">
            Total: <span className="font-bold">${total.toFixed(2)}</span>
          </p>
          <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
