import Image from "next/image";
import { Game } from "../../types";

interface CartItemProps {
  item: Game & { quantity: number };
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  maxQuantity?: number;
}

export function CartItem({ 
  item, 
  onRemove, 
  onUpdateQuantity, 
  maxQuantity = 10 
}: CartItemProps) {
  const handleQuantityChange = (increment: boolean) => {
    const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity > maxQuantity) return;
    onUpdateQuantity(item.id, newQuantity);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
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
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(false)}
              disabled={item.quantity <= 1}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span className="w-8 text-center" aria-label="Item quantity">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(true)}
              disabled={item.quantity >= maxQuantity}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p className="font-semibold">
            ${item.price.toFixed(2)} × {item.quantity}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => onRemove(item.id)}
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
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p className="font-bold text-lg">
          ${subtotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}