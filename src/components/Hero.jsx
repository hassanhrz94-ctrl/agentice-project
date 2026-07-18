"use client";

import { useState, useEffect } from "react";

const SLIDES = [
  {
    title: (
      <>
        Unleash the <span className="text-secondary">game</span>
      </>
    ),
    description: "Premium football jerseys, worn by legends. Feel the passion.",
    ctaText: "Shop now",
    ctaIcon: "fa-arrow-right",
    icon: "fa-tshirt",
    bgGradient: "from-[#0f2a3b] to-[#1a3b50]",
  },
  {
    title: (
      <>
        Classic <span className="text-secondary">kits</span>
      </>
    ),
    description: "Retro & modern styles – every stitch tells a story.",
    ctaText: "Explore retro",
    ctaIcon: "fa-history",
    icon: "fa-star",
    bgGradient: "from-[#112d42] to-[#1e4864]",
  },
  {
    title: (
      <>
        Match day <span className="text-secondary">ready</span>
      </>
    ),
    description: "Official replicas, authentic quality. Get yours today.",
    ctaText: "View collection",
    ctaIcon: "fa-trophy",
    icon: "fa-trophy",
    bgGradient: "from-[#0d2636] to-[#153448]",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="relative h-[65vh] min-h-[380px] w-full overflow-hidden bg-primary mb-8 select-none">
      {/* Slides Container */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full h-full bg-gradient-to-br ${slide.bgGradient} flex items-center justify-between px-[6%] md:px-[10%] gap-10 flex-wrap relative`}
          >
            {/* Slide Content */}
            <div className="flex-1 min-w-[280px] text-white z-10 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl opacity-80 max-w-[500px] mb-8 font-light">
                {slide.description}
              </p>
              <a
                href="#explore"
                className="inline-flex items-center gap-2 bg-secondary text-primary px-8 py-3.5 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform duration-200 shadow-[0_8px_20px_rgba(217,164,4,0.3)] hover:bg-secondary-light"
              >
                {slide.ctaIcon && <i className={`fas ${slide.ctaIcon}`}></i>}
                {slide.ctaText}
              </a>
            </div>

            {/* Slide Image / Big Icon */}
            <div className="flex-1 min-w-[200px] flex justify-center items-center z-10">
              <i
                className={`fas ${slide.icon} text-[8rem] md:text-[12rem] text-secondary opacity-35 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] animate-pulse`}
              ></i>
            </div>
          </div>
        ))}
      </div>

      {/* Left/Right Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 cursor-pointer z-20"
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200 cursor-pointer z-20"
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Indicators Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index
                ? "bg-secondary w-8"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
