import ImageCard from "./ImageCard";
import EbookCard from "./EbookCard";
import { motion } from "framer-motion";

const FeaturedImages = () => {
  const featuredImages = [
    { id: "1", title: "For our wonderful family", category: "Festival", price: 5, resolution: "4K", imageUrl: "1.jpeg", downloads: 1234 },
    { id: "2", title: "Joy to the world", category: "Festival", price: 5, resolution: "6K", imageUrl: "2.jpeg", downloads: 892 },
    { id: "3", title: "The Joyous Story of Christmas", category: "Festival", price: 5, resolution: "8K", imageUrl: "3.jpeg", downloads: 2105 },
    { id: "4", title: "Wishing you blessings and joy", category: "Festival", price: 5, resolution: "4K", imageUrl: "4.jpeg", downloads: 1567 },
    { id: "5", title: "Joyful Christmas & Happy New Year", category: "Festival", price: 5, resolution: "5K", imageUrl: "5.jpeg", downloads: 987 },
    { id: "6", title: "For Our Dearest Daughter", category: "Festival", price: 5, resolution: "4K", imageUrl: "6.jpeg", downloads: 756 },
    { id: "7", title: "May your journey be guided by His light", category: "Festival", price: 5, resolution: "4K", imageUrl: "7.jpeg", downloads: 756 },
  ];

//admin adshboard 






  const ebooks = [
    { id: "1", title: "The Fuel of Great Joy", category: "Inspirational", price: 10, coverUrl: "/ebooks/cover1.png", ebookUrl: "/ebooks/p1.pdf", downloads: 1234, description: "An inspiring story exploring the strength of faith and joy in life’s challenges.", pages: 12, fileSize: "4.8 MB", format: "PDF" },
    { id: "2", title: "Joyti's Light", category: "Inspirational", price: 10, coverUrl: "/ebooks/cover2.png", ebookUrl: "/ebooks/p2.pdf", downloads: 1234, description: "An inspiring story exploring the strength of faith and joy in life’s challenges.", pages: 12, fileSize: "4.8 MB", format: "PDF" },
    { id: "3", title: "God's Will Be Done", category: "Inspirational", price: 15, coverUrl: "/ebooks/cover3.png", ebookUrl: "/ebooks/p3.pdf", downloads: 1234, description: "An inspiring story exploring the strength of faith and joy in life’s challenges.", pages: 12, fileSize: "4.8 MB", format: "PDF" },
    { id: "4", title: "परमेश्वर की इच्छा", category: "Inspirational", price: 15, coverUrl: "/ebooks/cover4.png", ebookUrl: "/ebooks/p4.pdf", downloads: 1234, description: "An inspiring story exploring the strength of faith and joy in life’s challenges.", pages: 12, fileSize: "4.8 MB", format: "PDF" },
  ];

  //admin work image uploading 

// ✅ Load admin uploads from localStorage
const uploadedItems = (() => {
  try {
    return JSON.parse(localStorage.getItem("uploads") || "[]");
  } catch {
    return [];
  }
})();

// ✅ Merge uploads into existing lists
const dynamicImages = [
  ...featuredImages,
  ...uploadedItems.filter((item: any) => item.imageUrl),
];

const dynamicEbooks = [
  ...ebooks,
  ...uploadedItems.filter((item: any) => item.ebookUrl),
];



  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-purple-500 via-[#f6f1ff] to-[#1a0949] text-gray-900">
      {/* 🔹 Animated 3D Rotational Light Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
      >
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(186,128,255,0.25),transparent_70%)] blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_70%)] blur-[180px] rounded-full"></div>
      </motion.div>

      {/* 🔹 Main Content Container */}
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="rounded-[40px] p-10 md:p-16 bg-white/70 backdrop-blur-2xl shadow-[0_0_60px_rgba(186,128,255,0.15)] border border-white/20">
          
          {/* 🔸 Featured Images */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 drop-shadow-[0_3px_10px_rgba(0,0,0,0.1)]">
              Featured Images
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
              “Let your light shine before others.” — Matthew 5:16
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {dynamicImages.map((image) => (
              <motion.div
                key={image.id}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <ImageCard {...image} />
              </motion.div>
            ))}
          </div>

          <div className="my-20 border-t border-gray-200"></div>

          {/* 🔸 Featured eBooks */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 drop-shadow-[0_3px_10px_rgba(0,0,0,0.1)]">
              Featured eBooks
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
              Faith-filled stories and spiritual insights to uplift your heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {dynamicEbooks.map((ebook) => (

              <motion.div
                key={ebook.id}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <EbookCard {...ebook} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedImages;
