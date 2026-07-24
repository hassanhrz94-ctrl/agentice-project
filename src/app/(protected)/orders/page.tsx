"use client";

import { useState, useEffect } from "react";
import { getOrders } from "@/lib/client-store";
import Link from "next/link";

const STATUS_COLOR = {
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-primary border-l-[8px] border-secondary pl-5 mb-8">
        <i className="fas fa-receipt text-secondary mr-3" />
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-custom p-16 text-center">
          <i className="fas fa-receipt text-5xl text-customGray-dark/20 mb-4 block" />
          <h3 className="text-xl font-bold text-primary mb-2">No orders yet</h3>
          <p className="text-customGray-dark/60 mb-6">
            Add jerseys to your kit and place your first order!
          </p>
          <Link
            href="/shop"
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-accent transition-colors inline-flex items-center gap-2"
          >
            <i className="fas fa-store" /> Browse Shop
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-custom p-6"
            >
              {/* Order header */}
              <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
                <div>
                  <span className="font-bold text-primary text-lg">
                    {order.id}
                  </span>
                  <span className="text-customGray-dark/50 text-sm ml-3">
                    {order.date}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="text-accent font-bold text-lg">
                    ${order.total}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-4 grid sm:grid-cols-2 gap-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e6eaf0] rounded-xl flex items-center justify-center text-primary">
                      <i className={`fas ${item.icon} text-sm`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {item.name}
                      </p>
                      <p className="text-xs text-customGray-dark/50">
                        ×{item.quantity ?? 1} · ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
