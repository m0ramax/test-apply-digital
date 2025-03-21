"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { Game } from "../utils/endpoint";

interface CardProps {
  game: Game[];
}

export default function Card({ game }: CardProps) {
  const { addToCart } = useCart();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {game.map((el) => (
        <article
          key={el.id}
          className="flex flex-col items-center bg-slate-400 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative w-full aspect-square">
            {el.isNew && (
              <span className="absolute top-2 left-2 z-10 bg-green-500 text-white px-3 py-1 rounded-full">
                New
              </span>
            )}
            <Image
              src={el.image}
              alt={el.name}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold">{el.name}</h2>
            <p className="text-lg mt-2">{el.genre}</p>
            <p className="text-lg font-semibold mt-1">${el.price}</p>
            <button
              onClick={() => addToCart(el)}
              className="mt-4 bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
