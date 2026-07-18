"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getCartCount } from "@/lib/client-store";

const guestNav = [
  { href: "/", label: "Home", icon: "fa-home" },
  { href: "/shop", label: "Shop", icon: "fa-store" },
];

const memberNav = [
  { href: "/dashboard", label: "Dashboard", icon: "fa-chart-pie" },
  { href: "/shop", label: "Shop", icon: "fa-store" },
  { href: "/my-kit", label: "My Kit", icon: "fa-shopping-bag" },
  { href: "/favorites", label: "Favourites", icon: "fa-heart" },
  { href: "/orders", label: "Orders", icon: "fa-receipt" },
  { href: "/profile", label: "Profile", icon: "fa-user" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Read cart from localStorage on the client
  useEffect(() => {
    const update = () => setCartCount(getCartCount());
    update();
    // Refresh whenever storage changes (e.g. from the shop page)
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinks = user ? memberNav : guestNav;

  return (
    <nav className="sticky top-0 z-[999] w-full bg-primary px-5 shadow-[0_4px_12px_rgba(0,0,0,0.2)] flex items-center justify-between flex-wrap min-h-[70px]">
      {/* Brand + mobile toggle */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link
          href="/"
          className="text-[1.6rem] font-bold text-secondary tracking-[-0.5px] flex items-center select-none hover:opacity-90 transition-opacity"
        >
          <i className="fas fa-futbol text-white mr-2" />
          FootyThreads
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-[1.6rem] cursor-pointer md:hidden hover:text-secondary transition-colors duration-200"
          aria-label="Toggle navigation"
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`} />
        </button>
      </div>

      {/* Nav links */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex w-full md:w-auto flex-col md:flex-row gap-4 md:gap-[1.2rem] items-start md:items-center py-4 md:py-0`}
      >
        {/* Primary nav */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-[1.2rem] items-start md:items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-medium py-2 border-b-2 transition-all duration-200 hover:text-secondary w-full md:w-auto flex items-center gap-1.5 ${
                isActive(link.href)
                  ? "text-secondary border-secondary"
                  : "text-white border-transparent hover:border-secondary"
              }`}
            >
              <i className={`fas ${link.icon} text-sm opacity-80`} />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action area */}
        <div className="flex items-center gap-4 border-t border-[#2b4053] md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-between md:justify-start md:ml-4">
          {/* Cart icon */}
          <Link
            href={user ? "/my-kit" : "/auth/login"}
            className="relative cursor-pointer text-white hover:text-secondary transition-colors duration-200"
            title="My Kit"
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-shopping-bag text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2.5 -right-3.5 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            /* Logged in: avatar + logout */
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold text-sm hover:bg-secondary/30 transition-colors"
                title={user.name}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Link>
              <button
                onClick={() => { setIsOpen(false); logout(); }}
                className="bg-white/10 text-white px-4 py-1.5 rounded-[40px] font-semibold hover:bg-accent border-0 transition-colors duration-200 flex items-center gap-2 text-sm"
              >
                <i className="fas fa-sign-out-alt" /> Logout
              </button>
            </div>
          ) : (
            /* Guest: sign in + sign up */
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="text-white/80 text-sm hover:text-secondary transition-colors font-medium"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setIsOpen(false)}
                className="bg-secondary text-primary px-[18px] py-1.5 rounded-[40px] font-semibold hover:bg-secondary-hover border-0 transition-colors duration-200 flex items-center gap-2 text-sm"
              >
                <i className="fas fa-user" /> Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
