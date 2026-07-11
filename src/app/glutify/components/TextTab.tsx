"use client";

import { useState } from "react";
import { checkIngredientsText } from "../lib/glutenCheck";
import { CheckResult } from "../lib/types";

export default function TextTab({
  onResult,
}: {
  onResult: (result: CheckResult) => void;
}) {
  const [text, setText] = useState("");

  function handleCheck() {
    if (!text.trim()) return;
    onResult(checkIngredientsText(text, "text"));
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-white">Paste Ingredients</h2>
      <p className="mt-1 text-sm text-white/50">
        Paste an ingredient list and I&rsquo;ll flag anything that could
        contain gluten.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="e.g. Water, sugar, wheat flour, salt, natural flavoring..."
        className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none"
      />
      <button
        onClick={handleCheck}
        disabled={!text.trim()}
        className="mt-3 w-full rounded-xl bg-emerald-500 py-3 font-medium text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Check Ingredients
      </button>
    </div>
  );
}
