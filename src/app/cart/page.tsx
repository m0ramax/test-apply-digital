"use client";

import { useCart } from "../../hooks/cart/useCart";
import { CartItem } from "../../components/cart/CartItem";
import { OrderSummary } from "../../components/cart/OrderSummary";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, removeFromCart } = useCart();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    console.log("checkout clicked");
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-primary-base mb-4 gap-2"
      >
        <Image
          src="/arrow-left.svg"
          alt=""
          width={16}
          height={16}
          className="w-4 h-4"
        />
        Back to Catalog
      </Link>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
        <p className="text-gray-600">{itemCount} items</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  className="first:pt-0 last:pb-0"
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <OrderSummary items={items} total={total} />
            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-[#585660] text-white py-3 px-4 rounded-lg hover:opacity-75 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}