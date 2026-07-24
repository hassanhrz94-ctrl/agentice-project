import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function ProtectedLayout({ children }) {
  // Server-side auth guard (async cookies — Next.js 16 compatible)
  const user = await getSession();
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-5 w-full flex-grow py-10 min-h-[60vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
