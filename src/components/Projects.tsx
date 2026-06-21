"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, payment processing via Stripe, and an AI-powered recommendation engine.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Prisma"],
    gradient: "from-indigo-600 to-purple-600",
    stars: 128,
    forks: 34,
    featured: true,
    github: "#",
    live: "#",
    emoji: "🛒",
  },
  {
    title: "AI Chat Application",
    description:
      "Real-time AI-powered chat application with streaming responses, conversation history, and multi-model support using OpenAI and Anthropic APIs.",
    tags: ["React", "Node.js", "Socket.io", "OpenAI", "Redis"],
    gradient: "from-purple-600 to-pink-600",
    stars: 89,
    forks: 21,
    featured: true,
    github: "#",
    live: "#",
    emoji: "🤖",
  },
  {
    title: "Developer Dashboard",
    description:
      "A comprehensive developer analytics dashboard aggregating GitHub stats, CI/CD pipeline metrics, and team performance insights.",
    tags: ["React", "D3.js", "GraphQL", "GitHub API"],
    gradient: "from-blue-600 to-indigo-600",
    stars: 67,
    forks: 18,
    featured: false,
    github: "#",
    live: "#",
    emoji: "📊",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management tool with drag-and-drop Kanban boards, real-time updates, and Slack integration.",
    tags: ["Vue.js", "Firebase", "Tailwind CSS", "DnD"],
    gradient: "from-emerald-600 to-teal-600",
    stars: 45,
    forks: 12,
    featured: false,
    github: "#",
    live: "#",
    emoji: "✅",
  },
  {
    title: "Weather Forecast App",
    description:
      "Beautiful weather application with 7-day forecasts, interactive maps, severe weather alerts, and location-based recommendations.",
    tags: ["React", "OpenWeather API", "Mapbox", "PWA"],
    gradient: "from-cyan-600 to-blue-600",
    stars: 38,
    forks: 9,
    featured: false,
    github: "#",
    live: "#",
    emoji: "🌤️",
  },
  {
    title: "Portfolio Generator",
    description:
      "No-code portfolio builder that generates beautiful, responsive portfolio websites from a simple JSON configuration file.",
    tags: ["Next.js", "MDX", "Vercel", "TypeScript"],
    gradient: "from-rose-600 to-orange-600",
    stars: 156,
    forks: 42,
    featured: false,
    github: "#",
    live: "#",
    emoji: "🎨",
  },
];

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding bg-[#0d0d15] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            What I&apos;ve Built
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Featured{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Projects
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-xl mx-auto">
            A selection of projects I&apos;ve built with passion and care. Each one taught me
            something new.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featured.map((project, i) => (
            <div
              key={project.title}
              className={`group relative rounded-2xl overflow-hidden glass hover:border-indigo-500/20 transition-all duration-500 hover:-translate-y-2 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Gradient header */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{project.emoji}</div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={project.live}
                      className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-xs">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400" /> {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} /> {project.forks}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((project, i) => (
            <div
              key={project.title}
              className={`group glass rounded-xl p-5 hover:border-indigo-500/20 transition-all duration-500 hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{project.emoji}</span>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    className="text-slate-500 hover:text-white transition-colors duration-200"
                  >
                    <Github size={14} />
                  </a>
                  <a
                    href={project.live}
                    className="text-slate-500 hover:text-white transition-colors duration-200"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
              <h3 className="font-bold text-white mb-2 text-sm group-hover:text-indigo-300 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-white/5 text-slate-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="https://github.com/pranavsuresh829-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-indigo-500/30 text-slate-400 hover:text-white rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/5"
          >
            <Github size={18} />
            View More on GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
