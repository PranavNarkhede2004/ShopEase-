"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

type CartItem = {
  name: string;
  price: number;
  badge?: string;
  quantity?: number;
};
export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    card: ""
  });
  const [error, setError] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(cart);
    setTotal(cart.reduce((sum: number, item: { price: number; quantity?: number }) => sum + item.price * (item.quantity || 1), 0));
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setShowCheckout(true);
  };

  const validateDetails = () => {
    const { name, email, phone, address, city, state, zip, country } = userDetails;
    if (!name || !email || !phone || !address || !city || !state || !zip || !country) {
      setError("Please fill in all fields.");
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const validateCard = () => {
    if (!/^\d{16}$/.test(userDetails.card.replace(/\s/g, ""))) {
      setError("Please enter a valid 16-digit card number.");
      return false;
    }
    setError("");
    return true;
  };

  const handlePayment = () => {
    if (!validateDetails()) return;
    if (paymentType === "online" && !validateCard()) return;
    if (paymentType === "cod") {
      // Place order directly
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push({ items: cartItems, total, date: new Date().toISOString(), user: userDetails, paymentType: "COD" });
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.removeItem("cartItems");
      setCartItems([]);
      setTotal(0);
      setShowCheckout(false);
      window.location.href = "/orders";
      return;
    }
    // Online payment simulation
    setIsPaying(true);
    setError("");
    setPaymentStatus("");
    setTimeout(() => {
      if (Math.random() > 0.15) {
        setPaymentStatus("success");
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.push({ items: cartItems, total, date: new Date().toISOString(), user: userDetails, paymentType: "Online" });
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.removeItem("cartItems");
        setCartItems([]);
        setTotal(0);
        setTimeout(() => {
          setShowCheckout(false);
          setIsPaying(false);
          setPaymentStatus("");
          window.location.href = "/orders";
        }, 1500);
      } else {
        setPaymentStatus("failed");
        setIsPaying(false);
        setError("Payment failed. Please try again or use a different card.");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8 flex items-center justify-center gap-3">
          <ShoppingCart className="h-10 w-10 text-blue-600" />
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <span className="text-2xl">🛒</span>
            <div className="mt-2 mb-4 font-semibold">Your cart is empty.</div>
            <Link href="/" className="text-blue-600 hover:underline font-semibold">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border-b pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                    <div className="text-gray-500 text-sm">Unit Price: <span className="font-semibold text-blue-700">${item.price.toFixed(2)}</span></div>
                    <div className="text-xs text-gray-400">{item.badge}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-bold text-lg text-gray-900">Qty: {item.quantity || 1}</div>
                    <div className="text-sm text-purple-700 font-semibold">Total: ${(item.price * (item.quantity || 1)).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center">
              <div className="text-xl font-bold text-gray-900 mb-2">Cart Total</div>
              <div className="text-3xl font-extrabold text-blue-700">${total.toFixed(2)}</div>
              <div className="flex justify-end mt-8">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </button>
              </div>

              {/* Checkout Modal with Payment Type Selection */}
              {showCheckout && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowCheckout(false)} disabled={isPaying}>
                      &times;
                    </button>
                    <h2 className="text-2xl font-bold mb-4">Checkout Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input type="text" placeholder="Full Name" className="px-4 py-2 border rounded-lg" value={userDetails.name} onChange={e => setUserDetails({ ...userDetails, name: e.target.value })} disabled={isPaying} />
                      <input type="email" placeholder="Email" className="px-4 py-2 border rounded-lg" value={userDetails.email} onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} disabled={isPaying} />
                      <input type="tel" placeholder="Phone Number" className="px-4 py-2 border rounded-lg" value={userDetails.phone} onChange={e => setUserDetails({ ...userDetails, phone: e.target.value })} disabled={isPaying} />
                      <input type="text" placeholder="Address" className="px-4 py-2 border rounded-lg md:col-span-2" value={userDetails.address} onChange={e => setUserDetails({ ...userDetails, address: e.target.value })} disabled={isPaying} />
                      <input type="text" placeholder="City" className="px-4 py-2 border rounded-lg" value={userDetails.city} onChange={e => setUserDetails({ ...userDetails, city: e.target.value })} disabled={isPaying} />
                      <input type="text" placeholder="State" className="px-4 py-2 border rounded-lg" value={userDetails.state} onChange={e => setUserDetails({ ...userDetails, state: e.target.value })} disabled={isPaying} />
                      <input type="text" placeholder="Zip Code" className="px-4 py-2 border rounded-lg" value={userDetails.zip} onChange={e => setUserDetails({ ...userDetails, zip: e.target.value })} disabled={isPaying} />
                      <input type="text" placeholder="Country" className="px-4 py-2 border rounded-lg" value={userDetails.country} onChange={e => setUserDetails({ ...userDetails, country: e.target.value })} disabled={isPaying} />
                    </div>
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Order Summary</h3>
                      <ul className="mb-2 text-sm text-gray-700">
                        {cartItems.map((item, idx) => (
                          <li key={idx}>{item.name} x {item.quantity || 1} - ${item.price * (item.quantity || 1)}</li>
                        ))}
                      </ul>
                      <div className="font-bold">Total: ${total.toFixed(2)}</div>
                    </div>
                    <div className="mb-4">
                      <label className="font-semibold mr-4">Payment Method:</label>
                      <select className="border rounded-lg px-4 py-2" value={paymentType} onChange={e => setPaymentType(e.target.value)} disabled={isPaying}>
                        <option value="">Select</option>
                        <option value="cod">Cash on Delivery (COD)</option>
                        <option value="online">Online Payment</option>
                      </select>
                    </div>
                    {paymentType === "online" && (
                      <input type="text" placeholder="Card Number (16 digits)" className="px-4 py-2 border rounded-lg w-full mb-4" maxLength={19} value={userDetails.card} onChange={e => setUserDetails({ ...userDetails, card: e.target.value.replace(/[^\d]/g, "").replace(/(\d{4})(?=\d)/g, "$1 ") })} disabled={isPaying} />
                    )}
                    {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                    {isPaying ? (
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="loader mb-2" style={{ width: 32, height: 32, border: '4px solid #ddd', borderTop: '4px solid #4ade80', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        <div className="text-green-600 font-semibold">Processing Payment...</div>
                        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                      </div>
                    ) : paymentStatus === "success" ? (
                      <div className="text-green-600 font-bold text-center py-4">Payment Successful! Redirecting to orders...</div>
                    ) : paymentStatus === "failed" ? (
                      <div className="text-red-600 font-bold text-center py-4">Payment Failed. Please try again.</div>
                    ) : (
                      <button
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors w-full"
                        onClick={handlePayment}
                        disabled={!paymentType}
                      >
                        {paymentType === "online" ? "Pay & Place Order" : paymentType === "cod" ? "Place Order (COD)" : "Select Payment Method"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
