import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "/logo.jpg";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onLoginClick?: () => void;
}

export function Navbar({ onLoginClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "الرئيسية", href: "#hero" },
    { label: "الألعاب التعليمية", href: "#games" },
    { label: "حمّل التطبيق", href: "#download" },
    { label: "الألعاب الجماعية", href: "#challenge" },
    { label: "رحلة التعلم", href: "#journey" },
    { label: "باقات الأسعار", href: "#pricing" },
    { label: "مقالات", href: "#news" },
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const navbarOffset = 110;
      const top =
        el.getBoundingClientRect().top + window.scrollY - navbarOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed w-full flex justify-center mt-8 z-50">
        <div className="w-[80%] bg-[#6F267A] rounded-full shadow-lg px-2">
          <div className="flex items-center justify-between h-16">
            {/* Logo (right side in RTL) with white background */}
            <div className="flex items-center">
              <div className=" rounded-full px-3 py-1.5 flex items-center gap-1  h-16">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full rounded-full shadow-sm"
                />
              </div>
            </div>

            {/* Nav Links - Desktop */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-around px-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-white hover:text-[#FAA52F] text-sm transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Buttons (left side in RTL) - hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onLoginClick}
                className="bg-[#F97316] text-white px-5 py-3.5 rounded-full text-sm hover:bg-[#ea6a0a] transition-colors cursor-pointer"
              >
                تسجيل الدخول
              </button>
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#download");
                }}
                className="bg-[#FAA52F] text-white px-5 py-3.5 rounded-full text-sm hover:bg-[#e8941e] transition-colors cursor-pointer"
              >
                تحميل التطبيق
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Slide-in Drawer (from left) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-0 left-0 h-full w-72 z-[70] flex flex-col bg-[#6F267A] shadow-2xl md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
              <div className="bg-white rounded-full px-3 py-1.5 flex items-center gap-1 shadow-sm w-28">
                <img src={logo} alt="Logo" className="w-full h-full" />
              </div>
              <button
                className="p-1.5 text-white hover:text-[#FAA52F] transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto py-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center px-6 py-3.5 text-white hover:text-[#FAA52F] hover:bg-white/10 text-sm border-b border-white/10 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    scrollToSection(link.href);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="px-5 py-5 flex flex-col gap-3 border-t border-white/20">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onLoginClick?.();
                }}
                className="w-full bg-[#F97316] text-white py-2.5 rounded-full text-sm hover:bg-[#ea6a0a] transition-colors"
              >
                تسجيل الدخول
              </button>
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  scrollToSection("#download");
                }}
                className="w-full text-center bg-[#FAA52F] text-white py-2.5 rounded-full text-sm hover:bg-[#e8941e] transition-colors"
              >
                تحميل التطبيق
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
