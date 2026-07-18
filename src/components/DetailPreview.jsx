"use client";

import { useState, useEffect } from "react";
import { addToCart, toggleFavorite, isFavorite } from "@/lib/client-store";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DetailPreview({ jersey }) {
  const [isAdding, setIsAdding] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Check favorite state whenever jersey changes
  useEffect(() => {
    if (jersey) setFavorited(isFavorite(jersey.id));
  }, [jersey]);

  if (!jersey) return null;

  const handleAddToCart = () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setIsAdding(true);
    addToCart(jersey);
    // Trigger storage event so Navbar cart count updates
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleToggleFavorite = () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    const updated = toggleFavorite(jersey);
    setFavorited(updated.some((f) => f.id === jersey.id));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) stars.push(<i key={i} className="fas fa-star" />);
      else if (i === fullStars + 1 && hasHalf)
        stars.push(<i key={i} className="fas fa-star-half-alt" />);
      else stars.push(<i key={i} className="far fa-star" />);
    }
    return stars;
  };

  return (
    <section id="details-preview" className="my-8 scroll-mt-24">
      <div className="text-[2.2rem] font-bold my-10 text-primary border-l-[8px] border-secondary pl-5 flex items-center">
        <i className="fas fa-info-circle text-secondary mr-3" />
        Jersey Details
      </div>

      <div className="bg-cardBg rounded-custom p-[30px] shadow-custom my-[30px] flex flex-col md:flex-row gap-[30px] items-center md:items-stretch">
        {/* Media / Image Icon */}
        <div className="w-full md:w-[260px] bg-[#d9dee8] rounded-[20px] min-h-[220px] flex items-center justify-center text-[6rem] text-primary relative overflow-hidden group">
          <i className={`fas ${jersey.icon} group-hover:scale-110 transition-transform duration-300`} />
          <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {jersey.category}
          </span>

          {/* Favourite button overlay */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
              favorited
                ? "bg-accent text-white"
                : "bg-white/80 text-primary hover:bg-accent hover:text-white"
            }`}
            title={favorited ? "Remove from favourites" : "Add to favourites"}
          >
            <i className={`fas fa-heart text-sm`} />
          </button>
        </div>

        {/* Info Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-[2rem] font-bold text-primary mb-2">
              {jersey.name}
            </h2>

            {/* Stars */}
            <div className="text-secondary tracking-[2px] text-sm flex items-center gap-1.5 mb-4">
              {renderStars(jersey.rating)}
              <span className="text-customGray-dark text-xs font-semibold ml-2">
                {jersey.rating} / 5.0
              </span>
            </div>

            {/* Spec tags */}
            <div className="flex gap-3 flex-wrap my-4">
              {jersey.specs.map((spec, i) => (
                <span
                  key={i}
                  className="bg-customGray-light px-4 py-1.5 rounded-[40px] text-xs font-semibold text-customGray-dark uppercase tracking-wide border border-customGray-medium/40"
                >
                  {spec}
                </span>
              ))}
              <span className="bg-customGray-light px-4 py-1.5 rounded-[40px] text-xs font-semibold text-customGray-dark uppercase tracking-wide border border-customGray-medium/40">
                Origin: {jersey.origin}
              </span>
            </div>

            <p className="text-[#2f3b4e] text-[1.05rem] leading-relaxed my-5">
              {jersey.description}
            </p>
          </div>

          <div className="border-t border-customGray-medium/30 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
            <div className="text-xl text-[#2f3b4e]">
              Total Price:{" "}
              <span className="text-3xl font-extrabold text-accent ml-1">
                ${jersey.price}.00
              </span>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={handleToggleFavorite}
                className={`px-5 py-3.5 rounded-[60px] font-bold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 border-2 ${
                  favorited
                    ? "bg-accent text-white border-accent"
                    : "bg-transparent text-primary border-primary hover:border-accent hover:text-accent"
                }`}
                title={favorited ? "Unfavourite" : "Favourite"}
              >
                <i className="fas fa-heart" />
              </button>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 sm:flex-none px-8 py-3.5 rounded-[60px] font-bold text-lg cursor-pointer transition-all duration-200 flex items-center justify-center gap-3 ${
                  isAdding
                    ? "bg-green-600 text-white hover:bg-green-600"
                    : "bg-primary text-white hover:bg-accent shadow-lg shadow-primary/20 hover:scale-105"
                }`}
              >
                {isAdding ? (
                  <>
                    <i className="fas fa-check-circle animate-ping" /> Added!
                  </>
                ) : (
                  <>
                    <i className="fas fa-shopping-bag" /> Add to Kit
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
