import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import videos from "@/assets/v2.mp4";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

declare global {
interface Window {
Razorpay: any;
}
}

type Plan = {
id: string;
name: string;
displayPrice: string;
period: string;
features: string[];
amountINR: number;
durationMonths: number;
};

const plans: Plan[] = [
{
id: "basic-blessings",
name: "Basic Blessings",
displayPrice: "$5",
period: "/month",
features: ["10 Image Downloads", "Standard Quality (4K)", "Personal Use License", "Email Support"],
amountINR: 5,
durationMonths: 1,
},
{
id: "divine-access",
name: "Divine Access",
displayPrice: "$15",
period: "/month",
features: ["Unlimited Downloads", "High Quality (8K)", "Commercial Use License", "Priority Support"],
amountINR: 15,
durationMonths: 1,
},
{
id: "heavenly-lifetime",
name: "Heavenly Lifetime",
displayPrice: "$99",
period: "one-time",
features: ["Unlimited Lifetime Access", "All Image Qualities", "Full License Rights", "Exclusive Updates"],
amountINR: 99,
durationMonths: 120,
},
];

const Pricing: React.FC = () => {
const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
const [subscription, setSubscription] = useState<null | { plan: string; expiry: string }>(null);

// Load Razorpay SDK
useEffect(() => {
if (!window.Razorpay) {
const script = document.createElement("script");
script.src = "[https://checkout.razorpay.com/v1/checkout.js](https://checkout.razorpay.com/v1/checkout.js)";
script.async = true;
document.body.appendChild(script);
}
}, []);

// Load and validate existing subscription
useEffect(() => {
const stored = localStorage.getItem("subscription");
if (!stored) return;
try {
const parsed = JSON.parse(stored);
const expiry = new Date(parsed.expiry);
if (expiry > new Date()) {
setSubscription(parsed);
} else {
localStorage.removeItem("subscription");
}
} catch {
localStorage.removeItem("subscription");
}
}, []);

// Create order
const createOrder = async (amountPaise: number) => {
try {
const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ amount: amountPaise }),
});
const json = await res.json();
return json.data || json;
} catch (err) {
console.error("Create order error:", err);
toast.error("Error creating order.");
return null;
}
};

// Verify payment
const verifyPayment = async (payload: any) => {
try {
const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload),
});
const json = await res.json();
return json;
} catch (err) {
console.error("Verify error:", err);
return null;
}
};

// Razorpay handler
const openRazorpay = (orderData: any, plan: Plan) => {
if (!window.Razorpay) {
toast.error("Razorpay SDK not loaded!");
return;
}


const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: orderData.amount || plan.amountINR * 100,
  currency: "INR",
  name: "BMK Services",
  description: plan.name,
  order_id: orderData.id,
  handler: async (response: any) => {
    toast.loading("Verifying payment...");
    const verifyResp = await verifyPayment({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    });
    toast.dismiss();

    if (verifyResp?.success || verifyResp?.message) {
      toast.success("Payment verified successfully!");
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + plan.durationMonths);
      const sub = { plan: plan.name, expiry: expiry.toISOString() };
      localStorage.setItem("subscription", JSON.stringify(sub));
      setSubscription(sub);
    } else {
      toast.error("Payment verification failed.");
    }
  },
  theme: { color: "#7C3AED" },
};

const rzp = new window.Razorpay(options);
rzp.on("payment.failed", () => toast.error("Payment failed. Try again."));
rzp.open();


};

// Choose plan handler
const handleChoosePlan = async (plan: Plan) => {
if (subscription) {
toast.error(`You already have an active subscription: ${subscription.plan}`);
return;
}

setLoadingPlanId(plan.id);
const orderData = await createOrder(plan.amountINR * 100);
if (orderData?.id) openRazorpay(orderData, plan);
else toast.error("Failed to create order.");

setLoadingPlanId(null);


};

const isPlanActive = (plan: Plan) => {
if (!subscription) return false;
return subscription.plan === plan.name && new Date(subscription.expiry) > new Date();
};

return ( <div className="min-h-screen flex flex-col relative overflow-hidden"> <Toaster position="top-right" /> <div className="relative h-[60vh] md:h-[80vh] overflow-hidden rounded-b-[60px] shadow-2xl"> <video src={videos} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" /> <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" /> <Navbar /> <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"> <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">Choose Your Blessing Plan</h1> <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-2xl">Simple, transparent pricing made for every believer.</p> </div> </div>


  <main className="flex-1 py-20 bg-gradient-to-b from-white via-[#f5f0ff] to-white rounded-t-[60px] -mt-16 shadow-2xl z-10">
    <div className="container relative px-4 md:px-8 z-10 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-6">
          Find the Perfect Plan for You
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Whether you’re a creator, a church designer, or simply spreading joy — we have a plan that fits your mission.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-8 border border-white/40 hover:shadow-2xl transition-all hover:scale-[1.03]"
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">{plan.name}</h3>
            <div className="text-5xl font-extrabold text-gray-800 mb-2">
              {plan.displayPrice}
              <span className="text-lg font-medium text-gray-500">{plan.period}</span>
            </div>

            <ul className="text-gray-700 space-y-3 mb-8 text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="text-purple-500 h-5 w-5" /> {feature}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleChoosePlan(plan)}
              className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all"
              disabled={loadingPlanId === plan.id || isPlanActive(plan)}
            >
              {isPlanActive(plan)
                ? "Active Plan"
                : loadingPlanId === plan.id
                ? "Processing..."
                : "Choose Plan"}
            </Button>

            {isPlanActive(plan) && subscription && (
              <div className="mt-2 text-sm text-green-700 flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Active until {new Date(subscription.expiry).toLocaleDateString()}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  </main>

  <Footer />
</div>


);
};

export default Pricing;
