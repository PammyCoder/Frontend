import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mountain,
  Building2,
  Palmtree,
  Camera,
  Sparkles,
  Sun,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heros from "@/assets/v2.mp4";
import Navbar from "./Navbar";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Nature", icon: Mountain, count: 2340, color: "from-green-500 to-emerald-600" },
    { name: "Architecture", icon: Building2, count: 1820, color: "from-blue-500 to-cyan-600" },
    { name: "Travel", icon: Palmtree, count: 1650, color: "from-orange-500 to-pink-600" },
    { name: "Abstract", icon: Sparkles, count: 980, color: "from-purple-500 to-indigo-600" },
    { name: "Festivals", icon: Sun, count: 1420, color: "from-yellow-500 to-orange-500" },
    { name: "Technology", icon: Camera, count: 890, color: "from-cyan-500 to-blue-600" },
  ];

  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <Navbar />

      {/* 🔹 Back Button */}
      <div className="absolute top-5 left-5 z-30">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all border border-white/40"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* 🔹 Hero Section with video background */}
      <section className="relative flex flex-col items-center justify-center text-center h-[90vh] md:h-[100vh] overflow-hidden">
        <video
          src={heros}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div className="relative z-10 px-6 max-w-3xl text-white">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Discover Stunning Images
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Explore premium visuals crafted for creators and designers. Elevate your next project with breathtaking imagery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/browse">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                Explore Gallery
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🔹 3D Rotating Background Behind Categories */}
      <section className="relative py-24 overflow-hidden rounded-t-[60px] -mt-16 z-10 bg-gradient-to-b from-white/30 via-slate-100/40 to-white/30 backdrop-blur-2xl shadow-2xl">
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
        >
          <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[120px]" />
        </motion.div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from a wide range of vibrant categories, curated to inspire your creativity.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/category/${category.name.toLowerCase()}`} className="group">
                    <Card className="border-0 bg-white/40 backdrop-blur-xl shadow-md hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 rounded-2xl overflow-hidden">
                      <div className="p-6 text-center">
                        <div
                          className={`mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.count.toLocaleString()} images
                        </p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🔹 Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-background text-center">
        <div className="container px-4 md:px-8">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Start Downloading?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of creators discovering the perfect visuals every day. Access our full premium library instantly.
          </p>
          <Link to="/auth">
            <Button
              size="lg"
              className="px-8 text-lg rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition-all"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Categories;
