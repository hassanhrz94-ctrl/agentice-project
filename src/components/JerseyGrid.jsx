"use client";

import { useState, useEffect } from "react";

const JERSEYS = [
  {
    id: 1,
    name: "FC Barcelona 24/25",
    price: 89,
    rating: 4.9,
    origin: "Spain",
    category: "Club",
    description: "Official home jersey, breathable fabric.",
    specs: ["100% polyester", "Dri-fit", "#10"],
    icon: "fa-tshirt",
  },
  {
    id: 2,
    name: "Real Madrid Retro",
    price: 74,
    rating: 4.8,
    origin: "Spain",
    category: "Retro",
    description: "Classic 2000s style, pure nostalgia.",
    specs: ["100% polyester", "Retro stitch", "#5 Zidane"],
    icon: "fa-tshirt",
  },
  {
    id: 3,
    name: "Argentina 2022",
    price: 95,
    rating: 4.9,
    origin: "Argentina",
    category: "National",
    description: "World cup champion edition.",
    specs: ["100% polyester", "Champion edition", "#10 Messi"],
    icon: "fa-tshirt",
  },
  {
    id: 4,
    name: "Manchester United",
    price: 82,
    rating: 4.7,
    origin: "England",
    category: "Club",
    description: "Home kit with classic red.",
    specs: ["100% polyester", "Dri-fit", "#7"],
    icon: "fa-tshirt",
  },
  {
    id: 5,
    name: "Italy Retro 2006",
    price: 78,
    rating: 4.8,
    origin: "Italy",
    category: "Retro",
    description: "Famous World Cup winning squad home jersey.",
    specs: ["100% polyester", "Gold stitching", "#21 Pirlo"],
    icon: "fa-tshirt",
  },
  {
    id: 6,
    name: "PSG 24/25 Training",
    price: 65,
    rating: 4.6,
    origin: "France",
    category: "Training",
    description: "Official pre-match warmup jersey.",
    specs: ["100% polyester", "Aeroswift", "Logo print"],
    icon: "fa-running",
  },
];

export default function JerseyGrid({
  searchQuery,
  selectedCategory,
  selectedRating,
  sortBy,
  onSelectJersey,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredJerseys, setFilteredJerseys] = useState(JERSEYS);

  // Trigger skeleton loader on filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // 1. Filter
      let result = JERSEYS.filter((j) => {
        const matchesSearch =
          j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.origin.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === "All" || j.category === selectedCategory;

        const matchesRating =
          selectedRating === "All" || j.rating >= parseFloat(selectedRating);

        return matchesSearch && matchesCategory && matchesRating;
      });

      // 2. Sort
      if (sortBy === "price-asc") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
        result.sort((a, b) => b.price - a.price);
      } else if (sortBy === "rating") {
        result.sort((a, b) => b.rating - a.rating);
      }

      setFilteredJerseys(result);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedRating, sortBy]);

  const handleViewDetails = (jersey) => {
    onSelectJersey(jersey);
    // Smooth scroll to details preview
    const detailsSection = document.getElementById("details-preview");
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 my-8">
        {[1, 2, 4, 4].map((n, i) => (
          <div
            key={i}
            className="bg-cardBg rounded-custom shadow-custom overflow-hidden flex flex-col h-full min-h-[380px] animate-pulse"
          >
            <div className="shimmer-bg h-[180px] w-full"></div>
            <div className="p-[18px_20px_20px] flex-1 flex flex-col gap-3">
              <div className="shimmer-bg h-6 w-3/4 rounded"></div>
              <div className="shimmer-bg h-4 w-1/2 rounded"></div>
              <div className="shimmer-bg h-12 w-full rounded"></div>
              <div className="shimmer-bg h-10 w-full rounded-[60px] mt-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredJerseys.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-custom shadow-custom my-8">
        <i className="fas fa-search-minus text-5xl text-customGray-dark/30 mb-4"></i>
        <h3 className="text-xl font-bold text-primary mb-1">No jerseys found</h3>
        <p className="text-customGray-dark/70">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 my-8">
      {filteredJerseys.map((jersey) => (
        <div
          key={jersey.id}
          className="bg-cardBg rounded-custom shadow-custom overflow-hidden transition-all duration-300 ease-in-out flex flex-col h-full min-h-[380px] hover:-translate-y-2 hover:shadow-hover group"
        >
          {/* Card Image */}
          <div className="bg-[#e6eaf0] h-[180px] flex items-center justify-center text-[4rem] text-primary group-hover:bg-[#dbe0e9] transition-colors duration-300">
            <i className={`fas ${jersey.icon}`}></i>
          </div>

          {/* Card Body */}
          <div className="p-[18px_20px_20px] flex-1 flex flex-col">
            <h3 className="text-[1.2rem] font-bold text-primary mb-1.5 group-hover:text-accent transition-colors duration-200">
              {jersey.name}
            </h3>

            {/* Meta tags */}
            <div className="flex flex-wrap gap-3.5 text-[0.85rem] text-customGray-dark my-2">
              <span>
                <i className="fas fa-tag text-secondary mr-1"></i> ${jersey.price}
              </span>
              <span>
                <i className="fas fa-star text-secondary mr-1"></i> {jersey.rating}
              </span>
              <span>
                <i className="fas fa-map-pin text-secondary mr-1"></i> {jersey.origin}
              </span>
            </div>

            {/* Description */}
            <p className="text-[#2f3b4e] text-[0.95rem] leading-[1.4] flex-1 mt-2 mb-4">
              {jersey.description}
            </p>

            {/* CTA Button */}
            <button
              onClick={() => handleViewDetails(jersey)}
              className="bg-primary text-white border-0 py-2.5 rounded-[60px] font-semibold cursor-pointer transition-all duration-200 w-full hover:bg-accent flex items-center justify-center gap-2 mt-auto"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export { JERSEYS };
