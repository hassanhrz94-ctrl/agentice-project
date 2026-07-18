"use client";

import { useState, useEffect } from "react";
import { getCart, removeFromCart, placeOrder } from "@/lib/client-store";
import Link from "next/link";

export default function MyKitPage() {
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id) => {
    setCart(removeFromCart(id));
  };

  const handleCheckout = () => {
    if (!cart.length) return;
    placeOrder(cart);
    setCart([]);
    setOrdered(true);
  };

  const total = cart.reduce((s, i) => s + i.price * (i.quantity ?? 1), 0);

  if (ordered) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <i className="fas fa-check-circle text-green-600 text-4xl" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Order Placed!</h2>
        <p className="text-customGray-dark/60 mb-6">
          Your order has been placed successfully. Check your order history.
        </p>
        <div className="flex gap-3">
          <Link href="/orders" className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-accent transition-colors">
            View Orders
          </Link>
          <Link href="/shop" className="border border-primary text-primary px-6 py-2.5 rounded-full font-semibold hover:bg-primary/5 transition-colors">
            Keep Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-primary border-l-[8px] border-secondary pl-5 mb-8">
        <i className="fas fa-shopping-bag text-secondary mr-3" />
        My Kit
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-custom p-16 text-center">
          <i className="fas fa-shopping-bag text-5xl text-customGray-dark/20 mb-4 block" />
          <h3 className="text-xl font-bold text-primary mb-2">Your kit bag is empty</h3>
          <p className="text-customGray-dark/60 mb-6">
            Head to the shop and add some jerseys!
          </p>
          <Link
            href="/shop"
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-accent transition-colors inline-flex items-center gap-2"
          >
            <i className="fas fa-store" /> Browse Shop
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-custom p-5 flex items-center gap-5"
              >
                <div className="w-16 h-16 bg-[#e6eaf0] rounded-xl flex items-center justify-center text-2xl text-primary flex-shrink-0">
                  <i className={`fas ${item.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-primary truncate">{item.name}</h3>
                  <p className="text-sm text-customGray-dark/60">
                    {item.category} · {item.origin}
                  </p>
                  <p className="text-accent font-bold mt-1">${item.price}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-customGray-dark/60">
                  <span>×{item.quantity ?? 1}</span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-accent/70 hover:text-accent transition-colors"
                    aria-label="Remove item"
                  >
                    <i className="fas fa-trash" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-custom p-6 h-fit sticky top-24">
            <h2 className="font-bold text-primary text-lg mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm text-customGray-dark mb-4">
              {cart.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <span className="truncate max-w-[160px]">{i.name}</span>
                  <span>${i.price * (i.quantity ?? 1)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-primary text-lg">
              <span>Total</span>
              <span className="text-accent">${total}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-accent transition-colors hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <i className="fas fa-credit-card" /> Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
