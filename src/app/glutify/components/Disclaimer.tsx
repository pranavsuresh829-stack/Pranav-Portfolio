"use client";

export default function Disclaimer({ onAck }: { onAck: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-2xl">
        <h2 className="text-lg font-semibold text-white">Before you start</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Glutify helps you spot gluten in ingredient lists, but it&rsquo;s an
          informational tool, not medical advice. It can be wrong or
          incomplete, and it can&rsquo;t detect cross-contamination or
          guarantee a product is safe.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Always read the real label and, if you have celiac disease or an
          allergy, follow your doctor&rsquo;s guidance. You use Glutify at
          your own risk.
        </p>
        <button
          onClick={onAck}
          className="mt-5 w-full rounded-xl bg-emerald-500 py-2.5 font-medium text-emerald-950 transition hover:bg-emerald-400"
        >
          I understand
        </button>
      </div>
    </div>
  );
}
