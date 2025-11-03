import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedImages from "@/components/FeaturedImages";

import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        {/* <Categories /> */}
        <FeaturedImages />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
