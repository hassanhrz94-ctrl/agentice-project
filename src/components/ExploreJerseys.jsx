"use client";

export default function ExploreJerseys({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy,
}) {
  return (
    <section id="explore" className="my-8 scroll-mt-24">
      <div className="text-[2.2rem] font-bold my-10 text-primary border-l-[8px] border-secondary pl-5 flex items-center">
        <i className="fas fa-search text-secondary mr-3"></i>
        Explore Jerseys
      </div>

      <div className="flex flex-col lg:flex-row gap-5 bg-cardBg p-6 lg:py-5 lg:px-8 rounded-custom lg:rounded-[60px] shadow-custom my-[30px_20px] items-stretch lg:items-center">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by team, league, country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-11 pr-[18px] border border-customGray-medium rounded-[40px] text-[0.95rem] bg-white outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all duration-200"
          />
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-customGray-dark/50"></i>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-customGray-dark/50 hover:text-customGray-dark"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap gap-3 items-center flex-[2_1_auto]">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-3 px-[18px] border border-customGray-medium rounded-[40px] text-[0.95rem] bg-white outline-none focus:border-secondary cursor-pointer flex-1 min-w-[130px] transition-colors duration-200"
          >
            <option value="All">All Categories</option>
            <option value="National">National</option>
            <option value="Club">Club</option>
            <option value="Retro">Retro</option>
            <option value="Training">Training</option>
          </select>

          {/* Rating Filter */}
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="py-3 px-[18px] border border-customGray-medium rounded-[40px] text-[0.95rem] bg-white outline-none focus:border-secondary cursor-pointer flex-1 min-w-[130px] transition-colors duration-200"
          >
            <option value="All">All Ratings</option>
            <option value="4.5">4.5+ ★</option>
            <option value="4.8">4.8+ ★</option>
          </select>
        </div>

        {/* Sort Group */}
        <div className="flex-[1_1_auto] min-w-[150px]">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full py-3 px-[18px] border border-customGray-medium rounded-[40px] text-[0.95rem] bg-white outline-none focus:border-secondary cursor-pointer transition-colors duration-200"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>
      </div>
    </section>
  );
}
