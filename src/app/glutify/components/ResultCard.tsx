"use client";

import { CheckCircle2, AlertTriangle, XCircle, Star } from "lucide-react";
import { CheckResult } from "../lib/types";

const VERDICT_STYLES: Record<
  CheckResult["verdict"],
  { label: string; icon: typeof CheckCircle2; bg: string; border: string; text: string }
> = {
  "gluten-free": {
    label: "Gluten-free",
    icon: CheckCircle2,
    bg: "bg-emerald-950/40",
    border: "border-emerald-500/40",
    text: "text-emerald-400",
  },
  caution: {
    label: "Check closer",
    icon: AlertTriangle,
    bg: "bg-amber-950/40",
    border: "border-amber-500/40",
    text: "text-amber-400",
  },
  contains: {
    label: "Contains gluten",
    icon: XCircle,
    bg: "bg-rose-950/40",
    border: "border-rose-500/40",
    text: "text-rose-400",
  },
};

export default function ResultCard({
  result,
  onSave,
  saved,
}: {
  result: CheckResult | null;
  onSave?: () => void;
  saved?: boolean;
}) {
  if (!result) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
        <p className="font-medium text-white/70">Ready to scan</p>
        <p className="mt-1 text-sm text-white/40">Your result shows up here.</p>
      </div>
    );
  }

  const style = VERDICT_STYLES[result.verdict];
  const Icon = style.icon;

  return (
    <div className={`rounded-2xl border ${style.border} ${style.bg} p-6`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-7 w-7 flex-shrink-0 ${style.text}`} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`text-lg font-semibold ${style.text}`}>{style.label}</h3>
            {result.productName && (
              <span className="text-sm text-white/50">· {result.productName}</span>
            )}
          </div>
          {result.brand && <p className="text-sm text-white/40">{result.brand}</p>}
          <p className="mt-2 text-sm leading-relaxed text-white/80">{result.summary}</p>

          {result.flags.length > 0 && (
            <ul className="mt-4 space-y-2">
              {result.flags.map((f, i) => (
                <li
                  key={`${f.matched}-${i}`}
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm"
                >
                  <span className="font-medium text-white/90">{f.matched}</span>
                  <span className="text-white/50"> — {f.reason}</span>
                </li>
              ))}
            </ul>
          )}

          {onSave && (
            <button
              onClick={onSave}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/10"
            >
              <Star className={`h-3.5 w-3.5 ${saved ? "fill-amber-400 text-amber-400" : ""}`} />
              {saved ? "Saved to my list" : "Save to my list"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
