"use client";

import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    gradient: "from-indigo-500 to-purple-500",
    skills: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Vue.js", level: 75 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    gradient: "from-purple-500 to-pink-500",
    skills: [
      { name: "Node.js / Express", level: 85 },
      { name: "Python / FastAPI", level: 78 },
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 72 },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: "☁️",
    gradient: "from-blue-500 to-indigo-500",
    skills: [
      { name: "AWS / Vercel", level: 76 },
      { name: "Docker", level: 80 },
      { name: "GitHub Actions", level: 85 },
      { name: "Linux / Bash", level: 78 },
      { name: "Nginx", level: 70 },
    ],
  },
];

const techIcons = [
  { name: "React", color: "#61DAFB", emoji: "⚛️" },
  { name: "Next.js", color: "#ffffff", emoji: "▲" },
  { name: "TypeScript", color: "#3178C6", emoji: "🔷" },
  { name: "Node.js", color: "#339933", emoji: "🟢" },
  { name: "Python", color: "#3776AB", emoji: "🐍" },
  { name: "PostgreSQL", color: "#4169E1", emoji: "🐘" },
  { name: "Docker", color: "#2496ED", emoji: "🐳" },
  { name: "AWS", color: "#FF9900", emoji: "☁️" },
  { name: "Git", color: "#F05032", emoji: "🌿" },
  { name: "GraphQL", color: "#E10098", emoji: "🔮" },
  { name: "Redis", color: "#DC382D", emoji: "🔴" },
  { name: "MongoDB", color: "#47A248", emoji: "🍃" },
];

function SkillBar({
  name,
  level,
  animate,
  delay,
}: {
  name: string;
  level: number;
  animate: boolean;
  delay: number;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-slate-300 text-sm font-medium">{name}</span>
        <span className="text-indigo-400 text-xs font-semibold">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animate ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
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
    <section id="skills" className="section-padding bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            My Toolkit
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Skills &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Technologies
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto" />
        </div>

        {/* Skill Bars */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.title}
              className={`glass rounded-2xl p-6 hover:border-indigo-500/20 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${ci * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-xl shadow-lg`}
                >
                  {cat.icon}
                </div>
                <h3 className="font-bold text-white text-lg">{cat.title}</h3>
              </div>
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  animate={visible}
                  delay={ci * 150 + si * 100}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tech Cloud */}
        <div
          className={`transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-center text-slate-400 text-sm uppercase tracking-widest mb-8">
            Also familiar with
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techIcons.map((tech, i) => (
              <div
                key={tech.name}
                className={`flex items-center gap-2 px-4 py-2.5 glass rounded-xl hover:border-indigo-500/20 hover:-translate-y-1 transition-all duration-300 cursor-default ${
                  visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ transitionDelay: `${600 + i * 50}ms` }}
              >
                <span className="text-lg">{tech.emoji}</span>
                <span className="text-slate-300 text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
