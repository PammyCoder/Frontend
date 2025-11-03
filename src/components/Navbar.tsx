import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logos from "@/assets/logo.jpeg"
import {
  Camera,
  Menu,
  X,
  User,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "Categories", path: "/categories" },
    { name: "Pricing", path: "/pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg border-border/50 shadow-lg"
          : "bg-gradient-to-b from-black/70 via-black/40 to-transparent border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold text-xl tracking-tight group"
        >
           <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-lg ring-2 ring-gray-200 group-hover:ring-purple-300 transition-all duration-300">
            <img
              src={logos}
              alt="Logo"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent group-hover:opacity-90 transition">
          BMK Services
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-semibold transition-all duration-300 group ${
                isActive(link.path)
                  ? "text-white drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]"
                  : "text-gray-200 hover:text-white drop-shadow-[0_0_3px_rgba(0,0,0,0.7)]"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full transition-all duration-300 group-hover:w-full ${
                  isActive(link.path) ? "w-full" : ""
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Right Side Buttons + Social Icons */}
        <div className="flex items-center gap-3">
          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-3 pr-3 border-r border-border/40">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 transition group"
            >
              <Facebook className="h-4 w-4 text-gray-300 group-hover:text-primary transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 transition group"
            >
              <Instagram className="h-4 w-4 text-gray-300 group-hover:text-pink-500 transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 transition group"
            >
              <Twitter className="h-4 w-4 text-gray-300 group-hover:text-sky-400 transition" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 transition group"
            >
              <Linkedin className="h-4 w-4 text-gray-300 group-hover:text-blue-600 transition" />
            </a>
          </div>

          {/* Auth + Buttons */}
          <Link to="/auth">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 hover:text-primary transition text-white"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Link to="/auth">
            <Button
              size="sm"
              className="hidden md:inline-flex bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-md hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all duration-300"
            >
              Get Started
            </Button>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent/10 transition text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-border/40 shadow-xl animate-fadeIn text-white">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-fuchsia-400"
                    : "text-gray-200 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Socials in Mobile Menu */}
            <div className="flex items-center justify-center gap-4 pt-3 border-t border-border/40">
              <Facebook className="h-5 w-5 text-gray-300 hover:text-primary transition" />
              <Instagram className="h-5 w-5 text-gray-300 hover:text-pink-500 transition" />
              <Twitter className="h-5 w-5 text-gray-300 hover:text-sky-400 transition" />
              <Linkedin className="h-5 w-5 text-gray-300 hover:text-blue-600 transition" />
            </div>

            <Link to="/auth">
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-primary to-purple-600 text-white shadow-md hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
