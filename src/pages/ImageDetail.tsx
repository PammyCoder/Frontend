declare global {
  interface Window {
    Razorpay: any;
  }
}

import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

const ImageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);


  // ✅ Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Example image data
  const image = {
    title: "Sunset Mountain Landscape",
    category: "Nature",
    price: (5).toFixed(0),
    resolution: "4K",
    imageUrl: `/${id || "1"}.jpeg`,
    downloads: 1234,
    description:
      "A breathtaking view of mountains during golden hour. Perfect for websites, presentations, and print materials.",
    dimensions: "3840 x 2160",
    fileSize: "8.4 MB",
    format: "JPEG, PNG",
  };

  // ✅ Convert price to paise
  useEffect(() => {
    setAmount(Math.round(Number(image.price) * 100));
  }, [image.price]);

  // ✅ Create Razorpay order
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
      toast.error("Failed to create order");
      console.error(error);
    }
  };

  // ✅ Payment verification
 // ✅ Payment verification
const verifyPayment = async (response: any) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      }
    );

    const verifyData = await res.json();
    if (verifyData.message) {
  toast.success(verifyData.message);
  setPaymentSuccess(true); // ✅ show invoice button
  downloadImage();         // ✅ auto-download image after payment
}

  } catch (error) {
    toast.error("Verification failed!");
  }
};


  // ✅ Generic Razorpay handler
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
      },
      theme: { color: "#5f63b8" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // ✅ One-time image payment
  const handlePayment = async () => {
    const orderData = await createOrder(amount);
    if (orderData) openRazorpay(orderData, "Image Purchase", Number(image.price));
  };

  // ✅ Subscription payment (monthly/yearly)
  const handleSubscription = async (plan: "monthly" | "yearly") => {
    if (!email) {
      toast.error("Please enter your email before subscribing!");
      return;
    }

    const price = plan === "monthly" ? 30 : 365;
    const orderData = await createOrder(price * 100);

    if (orderData) {
      openRazorpay(orderData, `${plan.toUpperCase()} Subscription`, price);
    }
  };


 const downloadInvoice = () => {
  const invoiceHtml = `
    <html>
      <head>
        <title>Invoice - ${image.title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #4f46e5; }
          img { width: 300px; border-radius: 8px; margin-top: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          td, th { border: 1px solid #ddd; padding: 8px; }
          th { background-color: #f3f4f6; }
        </style>
      </head>
      <body>
        <h1>Invoice Details</h1>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <h2>Image Details</h2>
      
        <table>
          <tr><th>Title</th><td>${image.title}</td></tr>
          <tr><th>Category</th><td>${image.category}</td></tr>
          <tr><th>Resolution</th><td>${image.resolution}</td></tr>
          <tr><th>Dimensions</th><td>${image.dimensions}</td></tr>
          <tr><th>File Size</th><td>${image.fileSize}</td></tr>
          <tr><th>Format</th><td>${image.format}</td></tr>
          <tr><th>Price</th><td>$${image.price}</td></tr>
          <tr><th>Customer Email</th><td>${email}</td></tr>
        </table>
        <p style="margin-top:30px;">Thank you for your purchase!</p>
      </body>
    </html>
  `;
  const blob = new Blob([invoiceHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Invoice_${image.title.replace(/\s+/g, "_")}.html`;
  a.click();
  URL.revokeObjectURL(url);
};

const downloadImage = () => {
  fetch(image.imageUrl)
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${image.title.replace(/\s+/g, "_")}.jpeg`;
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch(() => toast.error("Failed to download image"));
};


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="container px-4 md:px-8 py-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Preview */}
            <div className="space-y-4">
              <Card className="overflow-hidden border-0 shadow-[var(--shadow-elegant)]">
                <div className="relative aspect-[4/3] bg-muted">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground">
                      {image.resolution}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex-1"
                >
                  <Heart
                    className={`mr-2 h-4 w-4 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {isLiked ? "Liked" : "Like"}
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {image.category}
                </Badge>
                <h1 className="text-4xl font-bold mb-2">{image.title}</h1>
                <p className="text-muted-foreground mb-6">
                  {image.description}
                </p>

                {/* Price Card */}
                <Card className="border-2 border-primary/20 shadow-[var(--shadow-elegant)]">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        License Price
                      </p>
                      <p className="text-4xl font-bold text-primary">
                        ${image.price}
                      </p>
                    </div>

                    {/* Email Input */}
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />

                    {/* One-time Payment */}
                    <Button
                      onClick={handlePayment}
                      size="lg"
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" /> Purchase & Download
                   
                   {paymentSuccess && (
  <Button
    onClick={downloadInvoice}
    variant="outline"
    size="sm"
    className="w-full mt-3"
  >
    Download Invoice 
  </Button>
)}

                    </Button>

       


                    {/* Subscription Buttons */}
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
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ImageDetail;
