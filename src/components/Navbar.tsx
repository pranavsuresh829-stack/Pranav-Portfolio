"use client";

import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/25 transition-shadow duration-300">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Pranav<span className="text-indigo-400">.</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                  activeSection === link.href.replace("#", "")
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {activeSection === link.href.replace("#", "") && (
                  <span className="absolute inset-0 bg-white/5 rounded-lg" />
                )}
                {link.label}
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 ${
                    activeSection === link.href.replace("#", "")
                      ? "w-4"
                      : "w-0 group-hover:w-4"
                  }`}
                />
              </button>
            ))}
            <a
              href="mailto:pranavsuri829@gmail.com"
              className="ml-4 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/5">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === link.href.replace("#", "")
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="mailto:pranavsuri829@gmail.com"
            className="block w-full text-center mt-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
