export default function Testimonials() {
  const reviews = [
    {
      text: "Best quality jersey I've ever owned. The fabric is incredible, light, and the fit is absolutely perfect. Feels just like the ones the pros wear.",
      author: "Alex M.",
      verified: true,
      stars: 5,
    },
    {
      text: "Fast shipping and superb customer support! They helped me size retro Real Madrid jersey correctly. It fits great and brings back so many memories.",
      author: "Sofia R.",
      verified: true,
      stars: 5,
    },
    {
      text: "I was skeptical about ordering training gear online, but the quick-dry tech works perfectly. Best addition to my football kit collection.",
      author: "Marcus K.",
      verified: true,
      stars: 4,
    },
  ];

  return (
    <section className="my-8">
      <div className="text-[2.2rem] font-bold my-10 text-primary border-l-[8px] border-secondary pl-5 flex items-center">
        <i className="fas fa-comment text-secondary mr-3"></i>
        Testimonials
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="bg-cardBg p-8 rounded-custom shadow-custom relative flex flex-col justify-between border border-customGray-medium/20 hover:shadow-hover transition-shadow duration-300"
          >
            <div>
              {/* Quote Icon */}
              <i className="fas fa-quote-left text-secondary/30 text-3xl absolute top-6 left-6"></i>
              
              {/* Stars */}
              <div className="text-secondary text-xs flex gap-1 mb-4 relative z-10 pt-2 pl-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={`${
                      i < rev.stars ? "fas fa-star" : "far fa-star"
                    }`}
                  ></i>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#2f3b4e] italic leading-relaxed text-sm md:text-base mb-6 relative z-10 pl-2">
                “{rev.text}”
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pl-2 mt-auto border-t border-customGray-medium/20 pt-4">
              <div className="bg-primary/10 w-9 h-9 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                {rev.author[0]}
              </div>
              <div>
                <strong className="text-primary text-sm">{rev.author}</strong>
                {rev.verified && (
                  <div className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                    <i className="fas fa-check-circle"></i> Verified Buyer
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
