// frontend/src/pages/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    // quick guard if someone opens /admin without login
    if (!localStorage.getItem("isAdmin")) navigate("/auth");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/auth");
  };

  const handleUpload = () => {
    if (!file || !title || !category || !price) {
      toast.error("Please fill all fields and select a file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      // define shape compatible with FeaturedImages -> either image or ebook
      const item: any = {
        id: Date.now().toString(),
        title,
        category,
        price: Number(price),
        downloads: 0,
      };

      if (file.type === "application/pdf") {
        item.coverUrl = ""; // optional
        item.ebookUrl = dataUrl;
        item.pages = 0;
        item.fileSize = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
        item.format = "PDF";
      } else {
        // image
        item.imageUrl = dataUrl;
        item.resolution = "4K";
        item.fileSize = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
        item.format = file.type;
      }

      const existing = JSON.parse(localStorage.getItem("uploads") || "[]");
      existing.push(item);
      localStorage.setItem("uploads", JSON.stringify(existing));

      toast.success("Uploaded successfully");
      setFile(null);
      setTitle("");
      setCategory("");
      setPrice("");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-700">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/")} variant="outline">Go Home</Button>
            <Button onClick={handleLogout} variant="ghost">Logout</Button>
          </div>
        </div>

        <div className="space-y-4">
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
          <input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Category" className="w-full p-2 border rounded" />
          <input value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price" type="number" className="w-full p-2 border rounded" />
          <input type="file" accept="image/*,application/pdf" onChange={(e)=>setFile(e.target.files?.[0]||null)} />
          <div className="flex gap-3">
            <Button onClick={handleUpload} className="bg-purple-600 text-white">Upload</Button>
            <Button onClick={() => { localStorage.removeItem("uploads"); toast.success("Cleared uploads"); }} variant="outline">Clear All Uploads</Button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminDashboard;
