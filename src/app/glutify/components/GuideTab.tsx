import { CONTAINS_GLUTEN, HIDDEN_GLUTEN } from "../lib/glutenCheck";

export default function GuideTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white">Hidden Gluten Cheat Sheet</h2>
      <p className="mt-1 text-sm text-white/50">
        Ingredient names that don&rsquo;t obviously say &ldquo;wheat&rdquo; but
        can still mean gluten.
      </p>

      <div className="mt-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-rose-400">
          Always contains gluten
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {CONTAINS_GLUTEN.map((t) => (
            <span
              key={t.term}
              title={t.reason}
              className="rounded-full border border-rose-500/30 bg-rose-950/30 px-3 py-1 text-xs text-rose-300"
            >
              {t.term}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-400">
          Sneaky / ambiguous — check closer
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {HIDDEN_GLUTEN.map((t) => (
            <span
              key={t.term}
              title={t.reason}
              className="rounded-full border border-amber-500/30 bg-amber-950/30 px-3 py-1 text-xs text-amber-300"
            >
              {t.term}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-white/40">
        Tap any term to see why it&rsquo;s flagged. This list isn&rsquo;t
        exhaustive — when in doubt, contact the manufacturer.
      </p>
    </div>
  );
}
