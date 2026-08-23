import { Suspense } from "react";
import Footer from "@/components/Footer";
import LandingPageProduct from "@/components/LandingPageProduct";
import Navbar from "@/components/Navbar";
import Verify from "@/components/Verify";

export default function VerifyCodePage() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<p className="text-center py-10">Loading verification...</p>}>
        <Verify />
      </Suspense>
      <LandingPageProduct />
      <Footer />
    </main>
  );
}