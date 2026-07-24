import Link from "next/link";

export const metadata = {
  title: "FootyThreads · Account",
};

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-[#0f3350] to-[#081f2e] flex flex-col">
      {/* Brand Header */}
      <header className="py-6 px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[1.4rem] font-bold text-secondary tracking-tight hover:opacity-90 transition-opacity"
        >
          <i className="fas fa-futbol text-white text-xl" />
          FootyThreads
        </Link>
      </header>

      {/* Centered form content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-white/30 text-xs">
        © {new Date().getFullYear()} FootyThreads. All rights reserved.
      </footer>
    </div>
  );
}
