export default function Features() {
  return (
    <section className="my-8">
      <div className="text-[2.2rem] font-bold my-10 text-primary border-l-[8px] border-secondary pl-5 flex items-center">
        <i className="fas fa-bolt text-secondary mr-3 animate-bounce"></i>
        Features
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 bg-cardBg py-[30px] px-5 rounded-custom shadow-custom my-5">
        <div className="text-center p-4 hover:scale-105 transition-transform duration-200">
          <div className="text-[2.6rem] font-bold text-accent mb-1">100%</div>
          <div className="text-customGray-dark font-medium">Polyester</div>
        </div>
        <div className="text-center p-4 hover:scale-105 transition-transform duration-200">
          <div className="text-[2.6rem] font-bold text-accent mb-1">⚡</div>
          <div className="text-customGray-dark font-medium">Quick dry</div>
        </div>
        <div className="text-center p-4 hover:scale-105 transition-transform duration-200">
          <div className="text-[2.6rem] font-bold text-accent mb-1">🏆</div>
          <div className="text-customGray-dark font-medium">Official</div>
        </div>
        <div className="text-center p-4 hover:scale-105 transition-transform duration-200">
          <div className="text-[2.6rem] font-bold text-accent mb-1">📦</div>
          <div className="text-customGray-dark font-medium">Free ship</div>
        </div>
      </div>
    </section>
  );
}
