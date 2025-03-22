import Link from "next/link";

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
}

export function CartSummary({ total, onCheckout }: CartSummaryProps) {
  return (
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
        <button
          onClick={onCheckout}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
