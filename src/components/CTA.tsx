"use client";

export default function CTA({ onShopAll }) {
  const handleShopAllClick = () => {
    if (onShopAll) onShopAll();
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-accent text-white p-8 rounded-custom text-center my-8 shadow-lg shadow-accent/20 relative overflow-hidden">
      {/* Background decoration */}
      <i className="fas fa-trophy absolute -left-10 -bottom-10 text-[9rem] opacity-5 -rotate-12"></i>
      
      <div className="max-w-xl mx-auto relative z-10 py-4">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Ready for kick-off?</h2>
        <p className="text-white/80 text-sm md:text-base mb-6 font-light">
          Get match-day ready with standard or retro editions. Free shipping on all orders.
        </p>
        <button
          onClick={handleShopAllClick}
          className="bg-white text-primary border-0 py-3.5 px-10 rounded-[60px] font-bold mt-1 hover:scale-105 transition-transform duration-200 cursor-pointer hover:bg-neutralBg shadow-md"
        >
          Shop All Jerseys
        </button>
      </div>
    </section>
  );
}
