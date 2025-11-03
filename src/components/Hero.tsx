import { Button } from "@/components/ui/button";
import { Search, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/v1.mp4";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 brightness-90"
        />
        {/* Gradient overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-purple-600/20 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 md:px-12 text-center text-white">
        {/* Headline */}
        <h1 className="text-2xl md:text-2xl font-extrabold leading-tight mb-6 drop-shadow-lg">
          <span className="block">Explore Stunning</span>
          <span className="block bg-gradient-to-r from-primary via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
            High-Quality Images
          </span>
          <span className="block">Instantly</span>
        </h1>

        {/* Short Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Browse breathtaking images and download them instantly — fast, easy,
          and always high-resolution.
        </p>

        {/* Search / Filter Bar */}
        <div className="max-w-2xl mx-auto bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row gap-2 sm:gap-0 mb-16 transition-all duration-300 hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]">
          <input
            type="text"
            placeholder="Search for images, categories or tags..."
            className="flex-1 bg-transparent text-white placeholder-gray-300 px-4 py-3 focus:outline-none text-base"
          />
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl sm:rounded-l-none hover:opacity-90 transition-all duration-300"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/browse">
            <Button
              size="xl"
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 text-white font-semibold text-lg shadow-md hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] hover:scale-105 transition-all duration-300"
            >
              <Search className="h-5 w-5 mr-2" />
              Browse Images
            </Button>
          </Link>

          <Button
            variant="outline"
            size="xl"
            className="w-full sm:w-auto border-white/40 text-white font-semibold text-lg hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300"
          >
            <Award className="h-5 w-5 mr-2" />
            Popular Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
