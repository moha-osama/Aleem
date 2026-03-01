import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "المراحل الدراسية", href: "#stages" },
  { label: "الألعاب التعليمية", href: "#games" },
  { label: "التطبيق", href: "#app" },
  { label: "أراء العملاء", href: "#reviews" },
  { label: "أخبارنا", href: "#news" },
  { label: "من نحن", href: "#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
            <span className="text-white font-black text-sm">IBAL</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-purple-600 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Phone + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+9660000000"
            className="flex items-center gap-2 text-sm text-gray-600 font-medium"
          >
            <Phone size={16} className="text-purple-600" />
            <span dir="ltr">+966 00 000 0000</span>
          </a>
          <a
            href="#stages"
            className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            اشترك معنا
          </a>
        </div>

        {/* Mobile Burger */}
        <button
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-gray-700 font-semibold hover:text-purple-600 border-b border-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#stages"
            className="mt-4 block text-center bg-gradient-to-r from-amber-400 to-orange-400 text-white px-5 py-2 rounded-full text-sm font-bold"
            onClick={() => setMenuOpen(false)}
          >
            اشترك معنا
          </a>
        </div>
      )}
    </nav>
  );
}
