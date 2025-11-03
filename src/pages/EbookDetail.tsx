declare global {
  interface Window {
    Razorpay: any;
  }
}
import { jsPDF } from "jspdf";


import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

const EbookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const ebook = {
    id,
    title: `Ebook Title ${id}`,
    category: "Inspirational",
    price: (10 * Number(id)).toFixed(0),
    coverUrl: `/ebooks/cover${id || "1"}.png`,
    ebookUrl: `/ebooks/p${id || "1"}.pdf`,
    downloads: 1000 + Number(id) * 123,
    description:
      "An inspiring story exploring the strength of faith and joy in life’s challenges. Perfect for personal growth and reflection.",
    pages: 10 + Number(id) * 2,
    fileSize: `${(4.5 + Number(id) * 0.3).toFixed(1)} MB`,
    format: "PDF",
  };

  useEffect(() => {
    setAmount(Math.round(Number(ebook.price) * 100));
  }, [ebook.price]);

  const createOrder = async (amt: number) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ amount: amt }),
        }
      );
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.error(error);
      toast.error("Payment initialization failed");
    }
  };

  const verifyPayment = async (response: any) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(response),
        }
      );
      const verifyData = await res.json();
      if (verifyData.message) toast.success(verifyData.message);
       setPaymentSuccess(true);
    } catch {
      toast.error("Verification failed!");
    }
  };

  const openRazorpay = (orderData: any, title: string, price: number) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded yet!");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: price * 100,
      currency: "INR",
      name: "Pammy",
      description: title,
      order_id: orderData.id,
      prefill: { email },
      handler: async (response: any) => {
        await verifyPayment(response);
        if (title.includes("eBook")) {
          const link = document.createElement("a");
          link.href = ebook.ebookUrl;
          link.download = ebook.title.replace(/\s+/g, "_") + ".pdf";
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success("🎉 Payment successful! Your eBook is downloading...");
        }
      },
      theme: { color: "#7C3AED" },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    const orderData = await createOrder(amount);
    if (orderData) openRazorpay(orderData, "eBook Purchase", ebook.price as any);
  };

  const handleSubscription = async (plan: string) => {
    if (!email) {
      toast.error("Please enter your email before subscribing!");
      return;
    }
    const price = plan === "monthly" ? 30 : 365;
    const orderData = await createOrder(price * 100);
    if (orderData)
      openRazorpay(orderData, `${plan.toUpperCase()} Subscription`, price);
  };

const downloadInvoice = () => {
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text("Invoice", 105, 20, { align: "center" });

  pdf.setFontSize(12);
  pdf.text(`Title: ${ebook.title}`, 20, 40);
  pdf.text(`Category: ${ebook.category}`, 20, 50);
  pdf.text(`Pages: ${ebook.pages}`, 20, 60);
  pdf.text(`File Size: ${ebook.fileSize}`, 20, 70);
  pdf.text(`Format: ${ebook.format}`, 20, 80);
  pdf.text(`Price: $${ebook.price}`, 20, 90);
  pdf.text(`Customer Email: ${email}`, 20, 100);
  pdf.text(`Date: ${new Date().toLocaleString()}`, 20, 110);

  pdf.text("Thank you for your purchase!", 20, 130);

  pdf.save(`${ebook.title.replace(/\s+/g, "_")}_Invoice.pdf`);
};


  

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-purple-50 to-purple-100 animate-gradient-move" />
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-200/30 blur-[120px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-300/20 blur-[160px] rounded-full animate-pulse-slower" />

      <Navbar />
      <main className="flex-1 pt-20 relative z-10">
        <div className="container px-4 md:px-8 py-10">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-gray-600 hover:text-purple-700 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left: Cover */}
            <div className="space-y-5">
              <Card className="overflow-hidden border-0 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-sm">
                <div className="relative aspect-[3/4]">
                  <img
                    src={ebook.coverUrl}
                    alt={ebook.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-md">
                      {ebook.format}
                    </Badge>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex-1 border-purple-200 hover:bg-purple-50"
                >
                  <Heart
                    className={`mr-2 h-4 w-4 transition-all ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {isLiked ? "Liked" : "Like"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-purple-200 hover:bg-purple-50"
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>

            {/* Right: Details */}
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="mb-3 bg-purple-100 text-purple-700"
              >
                {ebook.category}
              </Badge>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {ebook.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {ebook.description}
              </p>

              {/* Price Card */}
              <Card className="border border-purple-100 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
                <CardContent className="p-6 space-y-5">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">eBook Price</p>
                    <p className="text-4xl font-bold text-purple-700">
                      ${ebook.price}
                    </p>
                  </div>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
                  />

                  <Button
                    onClick={handlePayment}
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white shadow-md"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> Pay & Download PDF

                    {paymentSuccess && (
  <Button
    onClick={downloadInvoice}
    variant="outline"
    size="sm"
    className="w-full mt-3 border-purple-300 text-purple-700 hover:bg-purple-50"
  >
    Download Invoice
  </Button>
)}

                  </Button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <Button
                    onClick={() => handleSubscription("monthly")}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Monthly Subscription – $30
                  </Button>
                  <Button
                    onClick={() => handleSubscription("yearly")}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Yearly Subscription – $365
                  </Button>
                </div>
                  <Toaster />
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="bg-white/70 backdrop-blur-sm shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-gray-900">
                    eBook Details
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Pages</span>
                      <span className="font-medium">{ebook.pages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>File Size</span>
                      <span className="font-medium">{ebook.fileSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format</span>
                      <span className="font-medium">{ebook.format}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EbookDetail;
