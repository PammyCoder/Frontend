import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageCard from "@/components/ImageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import videos from "@/assets/v2.mp4";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { ArrowLeft, Images, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Browse = () => {
  const navigate = useNavigate();

  const allImages = [
    { id: "1", title: "For our wonderful family", category: "Festival", price: 5, resolution: "4K", imageUrl: "1.jpeg", downloads: 1234 },
    { id: "2", title: "Joy to the World", category: "Festival", price: 5, resolution: "6K", imageUrl: "2.jpeg", downloads: 892 },
    { id: "3", title: "The Joyous Story of Christmas", category: "Festival", price: 5, resolution: "8K", imageUrl: "3.jpeg", downloads: 2105 },
    { id: "4", title: "Wishing You Blessings and Joy", category: "Festival", price: 5, resolution: "4K", imageUrl: "4.jpeg", downloads: 1567 },
    { id: "5", title: "Joyful Christmas & Happy New Year", category: "Festival", price: 5, resolution: "5K", imageUrl: "5.jpeg", downloads: 987 },
    { id: "6", title: "For Our Dearest Daughter", category: "Festival", price: 5, resolution: "4K", imageUrl: "6.jpeg", downloads: 756 },
    { id: "7", title: "May Your Journey Be Guided by His Light", category: "Festival", price: 5, resolution: "4K", imageUrl: "7.jpeg", downloads: 756 },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  const filteredImages = allImages
    .filter((img) =>
      img.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((img) => (category === "all" ? true : img.category === category))
    .sort((a, b) => {
      if (sort === "downloads") return b.downloads - a.downloads;
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return b.id.localeCompare(a.id);
    });

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* 🔹 Hero Video Background */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden rounded-b-[60px] shadow-2xl">
        <video
          src={videos}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <Navbar />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Explore Christmas Blessings
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-2xl">
            Joyful, warm, and divine visuals for a Christian celebration.
          </p>
        </div>
      </div>

      {/* 🔹 Below Video Section - Rounded 3D Background */}
      <main className="flex-1 py-16 relative bg-gradient-to-b from-white via-slate-100 to-white rounded-t-[60px] -mt-16 shadow-2xl z-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-300/20 rounded-full blur-[120px]" />
        </div>

        <div className="container relative px-4 md:px-8 z-10">
          <div className="mb-8">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex items-center gap-2 rounded-full bg-white/50 backdrop-blur-md text-foreground hover:bg-white/70 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Images className="h-8 w-8 text-primary" />
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent">
                Browse Images
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Search, filter, and explore divine high-resolution imagery.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search images..."
                  className="pl-9 bg-white/60 rounded-full border-gray-300 focus:ring-2 focus:ring-indigo-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="rounded-full bg-white/60 border-gray-300 focus:ring-2 focus:ring-indigo-400">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Festival">Festival</SelectItem>
                  <SelectItem value="Nature">Nature</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="rounded-full bg-white/60 border-gray-300 focus:ring-2 focus:ring-indigo-400">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="downloads">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <p className="text-gray-600 text-sm md:text-base">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filteredImages.length}
              </span>{" "}
              results
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setCategory("all");
                setSort("newest");
              }}
              className="rounded-full text-sm bg-white/60 hover:bg-indigo-100"
            >
              Reset Filters
            </Button>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ImageCard {...image} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
