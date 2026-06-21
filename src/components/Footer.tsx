"use client";

import { Code2, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0a0f] border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Code2 size={14} className="text-white" />
            </div>
            <span className="text-slate-500 text-sm">
              Built with{" "}
              <Heart size={12} className="inline text-pink-500 mx-0.5" />
              by{" "}
              <span className="text-slate-300 font-medium">Pranav Suresh</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-600 text-xs">
              © {new Date().getFullYear()} Pranav Suresh
            </span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
