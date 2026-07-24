"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ExploreJerseys from "@/components/ExploreJerseys";
import JerseyGrid, { JERSEYS } from "@/components/JerseyGrid";
import DetailPreview from "@/components/DetailPreview";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

function ShopContent() {
  const searchParams = useSearchParams();

  // Initialise filters from URL query params (e.g. /shop?category=Club)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ?? "All"
  );
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedJersey, setSelectedJersey] = useState(JERSEYS[0]);

  // Sync category from URL when it changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  return (
    <main className="max-w-[1280px] mx-auto px-5 w-full flex-grow">
      {/* Page heading */}
      <div className="pt-10 pb-2">
        <h1 className="text-[2.2rem] font-bold text-primary border-l-[8px] border-secondary pl-5 flex items-center">
          <i className="fas fa-store text-secondary mr-3" />
          Jersey Shop
        </h1>
        <p className="text-customGray-dark/70 mt-2 pl-5 ml-2">
          Browse our full collection of premium football jerseys.
        </p>
      </div>

      {/* Filter & Sort toolbar */}
      <ExploreJerseys
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Product Grid */}
      <JerseyGrid
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedRating={selectedRating}
        sortBy={sortBy}
        onSelectJersey={setSelectedJersey}
      />

      {/* Detail Preview */}
      <DetailPreview jersey={selectedJersey} />

      {/* Social proof */}
      <Testimonials />
      <FAQ />
      <Newsletter />
    </main>
  );
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <main className="max-w-[1280px] mx-auto px-5 w-full flex-grow">
            <div className="pt-10 pb-2 animate-pulse">
              <div className="h-10 bg-customGray-medium/30 rounded-xl w-64 mb-4" />
              <div className="h-5 bg-customGray-medium/20 rounded w-96" />
            </div>
          </main>
        }
      >
        <ShopContent />
      </Suspense>
      <Footer />
    </>
  );
}
