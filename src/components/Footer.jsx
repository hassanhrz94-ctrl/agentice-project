export default function Footer() {
  return (
    <footer className="bg-primary text-[#d4dce8] py-10 px-5 mt-12 w-full">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h4 className="text-white mb-3.5 text-[1.1rem] font-bold flex items-center">
            <i className="fas fa-futbol mr-2 text-secondary"></i> FootyThreads
          </h4>
          <p className="opacity-70 text-sm leading-relaxed max-w-[220px]">
            Authentic football jerseys for fans worldwide. Wearing passion, stitching history.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white mb-3.5 text-[1.1rem] font-bold">Shop</h4>
          <a
            href="#explore"
            className="block text-[#bcc8da] my-1.5 transition-colors duration-200 hover:text-secondary text-sm"
          >
            New Arrivals
          </a>
          <a
            href="#explore"
            className="block text-[#bcc8da] my-1.5 transition-colors duration-200 hover:text-secondary text-sm"
          >
            Best Sellers
          </a>
          <a
            href="#explore"
            className="block text-[#bcc8da] my-1.5 transition-colors duration-200 hover:text-secondary text-sm"
          >
            Retro
          </a>
          <a
            href="#explore"
            className="block text-[#bcc8da] my-1.5 transition-colors duration-200 hover:text-secondary text-sm"
          >
            Training
          </a>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white mb-3.5 text-[1.1rem] font-bold">Support</h4>
          <a
            href="#"
            className="block text-[#bcc8da] my-1.5 transition-colors duration-200 hover:text-secondary text-sm"
          >
            Contact Support
          </a>
          <a
            href="#"
            className="block text-[#bcc8da] my-1.5 transition-colors duration-200 hover:text-secondary text-sm"
          >
            Size Guide
          </a>
          <a
            href="#"
            className="block text-[#bcc8da] my-1.5 transition-colors duration-200 hover:text-secondary text-sm"
          >
            Returns & Exchanges
          </a>
          <a
            href="#faq"
            className="block text-[#bcc8da] my-1.5 transition-colors duration-200 hover:text-secondary text-sm"
          >
            FAQ
          </a>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white mb-3.5 text-[1.1rem] font-bold">Connect</h4>
          <div className="flex gap-4 mb-4">
            <i className="fab fa-instagram text-[1.6rem] text-[#d4dce8] transition-all duration-200 hover:text-secondary hover:scale-110 cursor-pointer"></i>
            <i className="fab fa-twitter text-[1.6rem] text-[#d4dce8] transition-all duration-200 hover:text-secondary hover:scale-110 cursor-pointer"></i>
            <i className="fab fa-youtube text-[1.6rem] text-[#d4dce8] transition-all duration-200 hover:text-secondary hover:scale-110 cursor-pointer"></i>
            <i className="fab fa-tiktok text-[1.6rem] text-[#d4dce8] transition-all duration-200 hover:text-secondary hover:scale-110 cursor-pointer"></i>
          </div>
          <p className="mt-3 text-sm text-[#bcc8da]">hello@footythreads.com</p>
        </div>
      </div>

      <div className="border-t border-[#2b4053] mt-8 pt-5 text-center text-[0.9rem] text-[#bcc8da]/60">
        © {new Date().getFullYear()} FootyThreads – all rights reserved.
      </div>
    </footer>
  );
}
