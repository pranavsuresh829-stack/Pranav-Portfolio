"use client";

import { useEffect, useRef, useState } from "react";
import { User, Coffee, Code, Zap } from "lucide-react";

const stats = [
  { value: 3, suffix: "+", label: "Years Experience", icon: Coffee },
  { value: 25, suffix: "+", label: "Projects Built", icon: Code },
  { value: 15, suffix: "+", label: "Technologies", icon: Zap },
  { value: 100, suffix: "%", label: "Passion", icon: User },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let start = 0;
          const duration = 2000;
          const step = (end / duration) * 16;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, started]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-padding bg-[#0a0a0f] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Who I Am
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            About{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Me
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Avatar / Image area */}
          <div
            className={`flex justify-center transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden gradient-border relative">
                <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/20">
                    <span className="text-8xl select-none">👨‍💻</span>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white text-xs font-bold shadow-xl animate-float">
                Open to Work ✓
              </div>
              <div className="absolute -bottom-4 -left-4 px-3 py-2 bg-[#1a1a2e] border border-indigo-500/30 rounded-xl text-indigo-400 text-xs font-bold shadow-xl" style={{ animationDelay: "1s", animation: "float 6s 1s ease-in-out infinite" }}>
                🚀 Building cool stuff
              </div>
            </div>
          </div>

          {/* Bio */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Passionate about building{" "}
              <span className="text-indigo-400">amazing</span> web experiences
            </h3>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I&apos;m Pranav Suresh, a full stack developer with a deep passion for crafting
                clean, efficient, and user-centered applications. I thrive at the intersection
                of technology and design.
              </p>
              <p>
                With expertise spanning React, Next.js, Node.js, and cloud platforms, I love
                taking ideas from concept to production. Every project is an opportunity to
                learn, grow, and create something meaningful.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                contributing to open source, or working on side projects that push my
                boundaries.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["React", "Next.js", "TypeScript", "Node.js", "Python"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, suffix, label, icon: Icon }, i) => (
            <div
              key={label}
              className={`glass rounded-2xl p-6 text-center group hover:border-indigo-500/30 transition-all duration-700 hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors duration-300">
                <Icon size={20} className="text-indigo-400" />
              </div>
              <div className="text-3xl font-black text-white mb-1">
                <CountUp end={value} suffix={suffix} />
              </div>
              <div className="text-slate-500 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
