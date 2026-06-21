"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Clock, MessageSquare } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "pranavsuri829@gmail.com",
    href: "mailto:pranavsuri829@gmail.com",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "pranavsuresh829-stack",
    href: "https://github.com/pranavsuresh829-stack",
    color: "from-slate-500 to-slate-700",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "pranavsuresh",
    href: "https://linkedin.com/in/pranavsuresh",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Twitter,
    label: "Twitter",
    value: "@pranavsuresh",
    href: "https://twitter.com/pranavsuresh",
    color: "from-sky-400 to-blue-500",
  },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-[#0d0d15] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Let&apos;s{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Connect
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-xl mx-auto">
            Have a project in mind or just want to chat? I&apos;d love to hear from you.
            My inbox is always open.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div
            className={`lg:col-span-2 space-y-4 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Quick info */}
            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-white font-bold text-lg mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <MapPin size={16} className="text-indigo-400 flex-shrink-0" />
                  <span>India (Remote Worldwide)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <Clock size={16} className="text-indigo-400 flex-shrink-0" />
                  <span>IST (UTC+5:30) · Response within 24h</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <MessageSquare size={16} className="text-indigo-400 flex-shrink-0" />
                  <span>Open to freelance & full-time roles</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              {contactLinks.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 glass rounded-xl p-4 hover:border-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                    <div className="text-slate-300 text-sm font-medium group-hover:text-indigo-400 transition-colors duration-300 truncate">
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 px-6 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors duration-300"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all duration-300 text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all duration-300 text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all duration-300 text-sm"
                      placeholder="Project collaboration..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all duration-300 text-sm resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-70 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
