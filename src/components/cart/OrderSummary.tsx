import { Game } from "@/types";

interface OrderSummaryProps {
  items: (Game & { quantity: number })[];
  total: number;
}

export function OrderSummary({ items, total }: OrderSummaryProps) {
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className=" border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <p className="text-gray-600 mb-4">{itemCount} items</p>
      
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.name} ({item.quantity}x)
            </span>
            <span className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between">
          <span className="font-bold">Order Total</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}