"use client";

const CATEGORIES = [
  {
    name: "National",
    description: "International kits",
    rating: "4.8",
    region: "World",
    icon: "fa-flag",
    filterVal: "National",
  },
  {
    name: "Club",
    description: "Top leagues",
    rating: "4.9",
    region: "Europe",
    icon: "fa-shield-alt",
    filterVal: "Club",
  },
  {
    name: "Retro",
    description: "Vintage classics",
    rating: "4.7",
    region: "Archive",
    icon: "fa-history",
    filterVal: "Retro",
  },
  {
    name: "Training",
    description: "Practice gear",
    rating: "4.6",
    region: "Gym",
    icon: "fa-running",
    filterVal: "Training",
  },
];

export default function Categories({ onSelectCategory }) {
  const handleCategoryClick = (categoryVal) => {
    onSelectCategory(categoryVal);
    // Smooth scroll to explore section
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="my-8">
      <div className="text-[2.2rem] font-bold my-10 text-primary border-l-[8px] border-secondary pl-5 flex items-center">
        <i className="fas fa-tags text-secondary mr-3"></i>
        Categories
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 my-8">
        {CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            className="bg-cardBg rounded-custom shadow-custom overflow-hidden transition-all duration-300 ease-in-out flex flex-col h-full min-h-[380px] hover:-translate-y-2 hover:shadow-hover group"
          >
            <div className="bg-[#e6eaf0] h-[180px] flex items-center justify-center text-[4rem] text-primary group-hover:bg-[#dbe0e9] transition-colors duration-300">
              <i className={`fas ${cat.icon}`}></i>
            </div>
            
            <div className="p-[18px_20px_20px] flex-1 flex flex-col">
              <h3 className="text-[1.2rem] font-bold text-primary mb-1.5">{cat.name}</h3>
              <p className="text-[#2f3b4e] text-[0.95rem] leading-[1.4] flex-1">{cat.description}</p>
              
              <div className="flex flex-wrap gap-4 text-[0.85rem] text-customGray-dark my-3">
                <span>
                  <i className="fas fa-star text-secondary mr-1"></i> {cat.rating}
                </span>
                <span>
                  <i className="fas fa-map-pin text-secondary mr-1"></i> {cat.region}
                </span>
              </div>
              
              <button
                onClick={() => handleCategoryClick(cat.filterVal)}
                className="bg-primary text-white border-0 py-2.5 rounded-[60px] font-semibold mt-4 cursor-pointer transition-all duration-200 w-full hover:bg-accent flex items-center justify-center gap-2"
              >
                View Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
