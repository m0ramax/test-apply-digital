"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="w-full bg-[#E5E5E5] text-[#585660]">
      <div className="max-w-[1440px] mx-auto py-4 px-4 md:px-8 lg:px-12">
        <div className="flex justify-between max-w-6xl mx-auto">
          <Link href="/" className="text-2xl">
            GamerShop
          </Link>
          <Link
            href="/cart"
            className="relative p-2 rounded-lg transition-colors"
          >
            <Image
              src="/cart.svg"
              alt="Shopping Cart"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}