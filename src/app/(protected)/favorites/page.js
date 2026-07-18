"use client";

import { useState, useEffect } from "react";
import { getFavorites, toggleFavorite } from "@/lib/client-store";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (jersey) => {
    setFavorites(toggleFavorite(jersey));
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-primary border-l-[8px] border-secondary pl-5 mb-8">
        <i className="fas fa-heart text-secondary mr-3" />
        Favourites
      </h1>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-custom p-16 text-center">
          <i className="fas fa-heart text-5xl text-customGray-dark/20 mb-4 block" />
          <h3 className="text-xl font-bold text-primary mb-2">No favourites yet</h3>
          <p className="text-customGray-dark/60 mb-6">
            Browse jerseys and click the heart to save your favourites.
          </p>
          <Link
            href="/shop"
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-accent transition-colors inline-flex items-center gap-2"
          >
            <i className="fas fa-store" /> Browse Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((jersey) => (
            <div
              key={jersey.id}
              className="bg-white rounded-2xl shadow-custom overflow-hidden hover:-translate-y-1 hover:shadow-hover transition-all duration-200 group"
            >
              <div className="bg-[#e6eaf0] h-36 flex items-center justify-center text-5xl text-primary group-hover:bg-[#dbe0e9] transition-colors">
                <i className={`fas ${jersey.icon}`} />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-primary mb-1">{jersey.name}</h3>
                <p className="text-sm text-customGray-dark/60 mb-3">
                  {jersey.category} · {jersey.origin}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold text-lg">
                    ${jersey.price}
                  </span>
                  <button
                    onClick={() => handleRemove(jersey)}
                    className="text-accent hover:text-accent/70 transition-colors flex items-center gap-1 text-sm"
                  >
                    <i className="fas fa-heart-broken" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
