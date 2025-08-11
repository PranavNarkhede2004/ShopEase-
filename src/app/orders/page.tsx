"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type OrderItem = {
  name: string;
  price: number;
  quantity?: number;
};
type Order = {
  items: OrderItem[];
  total: number;
};
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const handleCancelOrder = (index: number) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
    localStorage.setItem("myOrders", JSON.stringify(updatedOrders));
  };

  useEffect(() => {
    const myOrders = JSON.parse(localStorage.getItem("myOrders") || "[]");
    setOrders(myOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-8 flex items-center justify-center gap-3">
          <span className="text-3xl">🧾</span>
          My Orders
        </h2>
        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-12 flex flex-col items-center">
            <span className="text-6xl mb-4">�</span>
            <div className="mb-4 font-semibold text-lg">No orders placed yet.</div>
            <Link href="/" className="text-green-600 hover:underline font-semibold text-lg">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, idx) => (
              <div key={idx} className="border-b pb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold text-lg text-gray-900">Order #{idx + 1}</div>
                  <div className="text-xs text-gray-400">{new Date().toLocaleDateString()}</div>
                </div>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-green-50 rounded px-3 py-2">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">{item.name}</span>
                        <span className="text-xs text-gray-500">Qty: {item.quantity || 1}</span>
                      </div>
                        <span className="font-semibold text-blue-700 text-lg">₹{(item.price * (item.quantity || 1)).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-green-700 font-bold text-xl">Total: ₹{order.total.toLocaleString("en-IN")}</span>
                  <button className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors" onClick={() => handleCancelOrder(idx)}>
                    Cancel Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
