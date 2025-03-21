"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="w-full bg-slate-800 text-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-4">
        <Link href="/" className="text-2xl font-bold">
          GameStore
        </Link>
        <Link
          href="/cart"
          className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors"
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
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          
        </Link>
      </div>
    </header>
  );
}
