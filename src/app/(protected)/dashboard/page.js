"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getCart, getFavorites, getOrders } from "@/lib/client-store";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ cart: 0, favorites: 0, orders: 0 });

  useEffect(() => {
    setStats({
      cart: getCart().length,
      favorites: getFavorites().length,
      orders: getOrders().length,
    });
  }, []);

  const cards = [
    {
      id: "stat-kit",
      href: "/my-kit",
      icon: "fa-shopping-bag",
      label: "Items in My Kit",
      value: stats.cart,
      color: "bg-primary",
      accent: "text-secondary",
    },
    {
      id: "stat-favorites",
      href: "/favorites",
      icon: "fa-heart",
      label: "Favourites",
      value: stats.favorites,
      color: "bg-accent",
      accent: "text-white",
    },
    {
      id: "stat-orders",
      href: "/orders",
      icon: "fa-receipt",
      label: "Orders Placed",
      value: stats.orders,
      color: "bg-[#1e6641]",
      accent: "text-white",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-secondary text-xl shadow-md">
            <i className="fas fa-futbol" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-primary">
              Hey, {user?.name?.split(" ")[0]} 👋
            </h1>
            <p className="text-customGray-dark/60 text-sm">
              Welcome back to your FootyThreads dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {cards.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            id={c.id}
            className={`${c.color} rounded-2xl p-6 flex items-center gap-5 shadow-custom hover:-translate-y-1 hover:shadow-hover transition-all duration-200 group`}
          >
            <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center">
              <i className={`fas ${c.icon} text-white text-2xl`} />
            </div>
            <div>
              <div className={`text-4xl font-extrabold ${c.accent}`}>
                {c.value}
              </div>
              <div className="text-white/70 text-sm mt-0.5">{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl shadow-custom p-6">
        <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
          <i className="fas fa-bolt text-secondary" /> Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: "/shop", icon: "fa-store", label: "Browse Shop" },
            { href: "/my-kit", icon: "fa-shopping-bag", label: "My Kit" },
            { href: "/favorites", icon: "fa-heart", label: "Favourites" },
            { href: "/profile", icon: "fa-user-edit", label: "Edit Profile" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-2 p-4 bg-neutralBg rounded-xl hover:bg-primary/5 transition-colors duration-200 text-center group"
            >
              <i className={`fas ${item.icon} text-primary text-xl group-hover:text-accent transition-colors`} />
              <span className="text-xs font-semibold text-customGray-dark">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
