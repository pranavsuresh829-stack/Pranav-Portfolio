"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";

const roles = [
  "Full Stack Developer",
  "React Enthusiast",
  "UI/UX Craftsman",
  "Problem Solver",
  "Open Source Contributor",
];

const floatingElements = [
  { x: "10%", y: "20%", size: 300, delay: 0 },
  { x: "80%", y: "10%", size: 200, delay: 2 },
  { x: "60%", y: "70%", size: 250, delay: 1 },
  { x: "20%", y: "75%", size: 180, delay: 3 },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    typingRef.current = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [displayText, isDeleting, roleIndex]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* Animated background blobs */}
      {floatingElements.map((el, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-[0.07] blur-3xl pointer-events-none"
          style={{
            left: el.x,
            top: el.y,
            width: el.size,
            height: el.size,
            background: i % 2 === 0
              ? "radial-gradient(circle, #6366f1, #8b5cf6)"
              : "radial-gradient(circle, #ec4899, #8b5cf6)",
            animation: `float ${6 + el.delay}s ease-in-out ${el.delay}s infinite`,
          }}
        />
      ))}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial gradient center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_60%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Sparkles size={14} className="animate-pulse" />
          Available for opportunities
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>

        {/* Main heading */}
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-white block mb-2">Hi, I&apos;m</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Pranav Suresh
          </span>
        </h1>

        {/* Typing animation */}
        <div
          className={`h-12 flex items-center justify-center mb-8 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-300">
            <span className="text-indigo-400 font-medium">{displayText}</span>
            <span className="inline-block w-0.5 h-7 bg-indigo-400 ml-1 animate-pulse" />
          </p>
        </div>

        {/* Description */}
        <p
          className={`text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          I craft elegant, performant web experiences with modern technologies.
          Passionate about clean code, beautiful design, and solving real problems.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              View My Work
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-4 border border-white/10 hover:border-indigo-500/50 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 backdrop-blur-sm"
          >
            Get In Touch
          </button>
        </div>

        {/* Social Links */}
        <div
          className={`flex items-center justify-center gap-4 transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {[
            { icon: Github, href: "https://github.com/pranavsuresh829-stack", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/pranavsuresh", label: "LinkedIn" },
            { icon: Mail, href: "mailto:pranavsuri829@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 transition-all duration-700 delay-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
