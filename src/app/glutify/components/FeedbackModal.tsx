"use client";

import { useState } from "react";
import { X } from "lucide-react";

const FEEDBACK_EMAIL = "pranavsuri829@gmail.com";

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function send() {
    const subject = encodeURIComponent("Glutify feedback");
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Send feedback</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-sm text-white/50">
          Wrong ingredient flag, a bug, a feature idea — whatever it is.
        </p>
        {sent ? (
          <p className="mt-4 rounded-lg bg-emerald-950/40 p-3 text-sm text-emerald-400">
            Thanks — your email app should be open. Send it over and I&rsquo;ll take a look.
          </p>
        ) : (
          <>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="What happened?"
              className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="rounded-full px-4 py-2 text-sm text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={send}
                disabled={!message.trim()}
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-emerald-950 transition hover:bg-emerald-400 disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
