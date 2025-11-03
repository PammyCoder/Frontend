import { Twitter, Facebook, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logos from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/60 to-white border-t border-purple-100">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-200/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-200/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative px-4 md:px-8 py-14 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 🟣 Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-3 font-bold text-xl mb-5 group"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl shadow-lg ring-2 ring-purple-200 group-hover:ring-purple-400 transition-all duration-500">
                <img
                  src={logos}
                  alt="Logo"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 group-hover:opacity-90 transition text-2xl font-extrabold">
                BMK Services
              </span>
            </Link>

            <p className="text-gray-600 max-w-md mb-5 leading-relaxed">
              Elevate your visuals with premium, professional images. Browse,
              purchase, and download instantly — powered by modern simplicity.
            </p>

            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, color: "hover:text-sky-500" },
                { icon: Facebook, color: "hover:text-blue-600" },
                { icon: Instagram, color: "hover:text-pink-500" },
                { icon: Mail, color: "hover:text-purple-600" },
              ].map(({ icon: Icon, color }, i) => (
                <a
                  key={i}
                  href="#"
                  className={`p-2.5 rounded-full bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-all ${color}`}
                >
                  <Icon className="h-5 w-5 text-gray-600 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* 🟣 Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link
                  to="/browse"
                  className="hover:text-purple-700 transition-colors"
                >
                  Browse Images
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-purple-700 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-purple-700 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-purple-700 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 🟣 Support Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">
              Support
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link
                  to="/help"
                  className="hover:text-purple-700 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-purple-700 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-purple-700 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-purple-700 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 🟣 Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-purple-100 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-purple-700 font-semibold">
              BMK Services
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
