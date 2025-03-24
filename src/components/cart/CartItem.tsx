import Image from "next/image";
import { Game } from "../../types";

interface CartItemProps {
  item: Game & { quantity: number };
  onRemove: (id: string) => void;
  className?: string;
}

export function CartItem({ item, onRemove, className = "" }: CartItemProps) {
  return (
    <div className={`flex flex-col md:flex-row items-start gap-6 bg-white p-4 ${className}`}>
      <div className="relative w-72 h-48 md:w-48 md:h-32 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          priority
        />
        {item.isNew && (
          <span className="absolute top-2 left-2 bg-primary-tag text-primary-base text-xs font-bold px-2 py-1 rounded">
            New
          </span>
        )}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-0 -right-12 p-2 text-primary-icon hover:text-gray-700 md:hidden"
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
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex-grow w-full">
        <p className="text-sm text-gray-500 uppercase mb-1">{item.genre}</p>
        <h2 className="text-xl font-bold mb-2">{item.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-2 mb-2">{item.description}</p>
        <p className="font-semibold text-right pr-4">
          ${item.price.toFixed(2)}
        </p>
      </div>
      <div className="hidden md:block flex-shrink-0">
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-primary-icon hover:text-gray-700"
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
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}