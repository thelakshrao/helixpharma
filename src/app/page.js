import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroProduct from "@/components/HeroProduct";
import Bodybuilding from "@/components/Bodybuilding";
import Verify from "@/components/Verify";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HeroProduct />
      <Bodybuilding />
      <Verify />
      <Footer />
    </main>
  );
}