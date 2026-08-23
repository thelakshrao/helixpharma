import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroProduct from "@/components/HeroProduct";
import Bodybuilding from "@/components/Bodybuilding";
import Verify from "@/components/Verify";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import LandingPageProduct from "@/components/LandingPageProduct";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HeroProduct />
      <Suspense fallback={null}>
        <LandingPageProduct />
      </Suspense>
      <Bodybuilding />
      <Verify />
      <Footer />
    </main>
  );
}
