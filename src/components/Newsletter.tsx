"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-primary text-white p-10 rounded-custom text-center my-8 shadow-lg shadow-primary/20 relative overflow-hidden">
      {/* Decorative soccer ball in background */}
      <i className="fas fa-futbol absolute -right-10 -bottom-10 text-[10rem] opacity-5 rotate-12"></i>
      
      <div className="max-w-xl mx-auto relative z-10">
        <h3 className="text-2xl md:text-3xl font-extrabold flex items-center justify-center gap-3 mb-2">
          <i className="fas fa-envelope text-secondary"></i> Join the Squad
        </h3>
        
        <p className="text-customGray-light/80 text-sm md:text-base mb-6 font-light">
          Get 10% off your first jersey purchase + early access to exclusive retro drops.
        </p>

        {isSubscribed ? (
          <div className="bg-green-600/20 border border-green-500/40 text-green-300 py-3 px-6 rounded-full inline-block font-semibold animate-fade-in">
            <i className="fas fa-check-circle mr-2"></i> Welcome to the club! Check your inbox for the discount.
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-3.5 px-6 rounded-[60px] border-0 w-full sm:w-[280px] text-primary outline-none focus:ring-2 focus:ring-secondary text-sm"
            />
            <button
              type="submit"
              className="bg-secondary hover:bg-secondary-light border-0 py-3.5 px-8 rounded-[60px] font-bold text-primary transition-all duration-200 cursor-pointer w-full sm:w-auto hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
