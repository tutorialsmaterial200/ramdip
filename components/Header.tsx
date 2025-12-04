"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#vision", label: "Vision" },
  { href: "#achievements", label: "Achievements" },
  { href: "#gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt="Mr. Jagat Bahadur Simkhada Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-red-600 shadow-md"
            />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-gray-900 block leading-tight">
               Mr. Jagat Bahadur Simkhada 
              </span>
              <span className="text-xs text-red-600">
           नेपाली कम्युनिष्ट पार्टी(माओवादी केन्द्र)
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-red-600 font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/admin/login"
              className="px-4 py-2 text-gray-600 hover:text-red-600 font-medium transition-colors"
            >
              Admin
            </a>
            <a
              href="/appointments"
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg shadow-red-500/25"
            >
              Join the Movement
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-red-600 font-medium transition-colors duration-200 py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex justify-center px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-200 mt-2"
              >
                Join the Movement
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
