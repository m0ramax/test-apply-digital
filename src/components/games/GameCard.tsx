"use client";

import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { Game } from "../../types";

interface CardProps {
  game: Game;
}

export default function GameCard({ game }: CardProps) {
  const { items, removeFromCart, addToCart } = useCart();
  const isInCart = items.some((item) => item.id === game.id);

  const handleClick = () => {
    if (isInCart) {
      removeFromCart(game.id);
    } else {
      addToCart(game);
    }
  };

  return (
    <div className="w-full h-full border-[0.5px] border-primary-base rounded-2xl overflow-hidden p-4 flex flex-col">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={game.image}
          alt={game.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full rounded-t-2xl overflow-hidden aspect-1_16 md:aspect-1_38 bg-primary-base"
          priority
        />
        {game.isNew && (
          <span className="bg-primary-tag font-normal text-base text-primary-base rounded px-2 py-1 pointer-events-none absolute m-3">
            New
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3">
        <p className="text-sm text-gray-500 uppercase mb-1">{game.genre}</p>
        <div className="w-full flex justify-between">
          <h2 className="font-medium text-gray-900 mb-2">{game.name}</h2>
          <span className="block text-base font-medium text-gray-900 mb-2">
            ${game.price.toFixed(0)}
          </span>
        </div>
        <div className="mt-auto">
          <button
            onClick={handleClick}
            className={`
              w-full
              h-10
              px-3 py-1 
              text-xs font-medium 
              rounded-lg
              transition-colors
              uppercase 
              ${
                isInCart
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "border border-primary-base hover:bg-[#EEEEEE] text-primary-base"
              }
            `}
          >
            {isInCart ? "Remove" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}