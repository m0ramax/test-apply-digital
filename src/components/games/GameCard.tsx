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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video">
        <Image src={game.image} alt={game.name} fill className="object-cover" />
        {game.isNew && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            New
          </span>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{game.name}</h2>
        <p className="text-gray-600 mb-4">{game.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${game.price}</span>
          <button
            onClick={handleClick}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isInCart
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isInCart ? "Remove" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
