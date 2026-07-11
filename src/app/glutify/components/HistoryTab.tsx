"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { clearHistory, getHistory, toggleHistorySaved } from "../lib/storage";
import { ScanHistoryEntry } from "../lib/types";

const VERDICT_DOT: Record<ScanHistoryEntry["verdict"], string> = {
  "gluten-free": "bg-emerald-400",
  caution: "bg-amber-400",
  contains: "bg-rose-400",
};

export default function HistoryTab() {
  const [history, setHistory] = useState<ScanHistoryEntry[]>([]);
  const [filter, setFilter] = useState<"all" | "saved">("all");

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  function handleToggleSaved(id: string) {
    setHistory(toggleHistorySaved(id));
  }

  function handleClear() {
    clearHistory();
    setHistory([]);
  }

  const visible = filter === "saved" ? history.filter((h) => h.saved) : history;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Your Scans</h2>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-white/40 hover:text-rose-400"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-3 py-1 text-xs ${
            filter === "all" ? "bg-white/15 text-white" : "text-white/40"
          }`}
        >
          All scans
        </button>
        <button
          onClick={() => setFilter("saved")}
          className={`rounded-full px-3 py-1 text-xs ${
            filter === "saved" ? "bg-white/15 text-white" : "text-white/40"
          }`}
        >
          ★ Saved
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {visible.length === 0 && (
          <p className="text-sm text-white/30">Nothing here yet.</p>
        )}
        {visible.map((h) => (
          <div
            key={h.id}
            className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <div className="flex min-w-0 gap-2">
              <span
                className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${VERDICT_DOT[h.verdict]}`}
              />
              <div className="min-w-0">
                <p className="truncate font-medium text-white">
                  {h.productName || (h.rawText ? h.rawText.slice(0, 40) : h.barcode) || "Scan"}
                </p>
                <p className="text-xs text-white/40">
                  {new Date(h.timestamp).toLocaleString()} · {h.source}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggleSaved(h.id)}
              className="flex-shrink-0 text-white/30 hover:text-amber-400"
            >
              <Star className={`h-4 w-4 ${h.saved ? "fill-amber-400 text-amber-400" : ""}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
