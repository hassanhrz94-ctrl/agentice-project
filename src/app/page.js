"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  const handleSelectCategory = (category) => {
    router.push(`/shop?category=${encodeURIComponent(category)}`);
  };

  const handleShopAll = () => {
    router.push("/shop");
  };

  return (
    <>
      <Navbar />
      <Hero />
      <main className="max-w-[1280px] mx-auto px-5 w-full flex-grow">
        <Features />
        <Categories onSelectCategory={handleSelectCategory} />
        <CTA onShopAll={handleShopAll} />
      </main>
      <Footer />
    </>
  );
}
