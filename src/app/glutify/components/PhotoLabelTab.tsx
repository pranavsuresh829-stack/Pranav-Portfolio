"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { checkIngredientsText } from "../lib/glutenCheck";
import { CheckResult } from "../lib/types";

export default function PhotoLabelTab({
  onResult,
}: {
  onResult: (result: CheckResult) => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setError(null);
    setPreviewUrl(URL.createObjectURL(f));
  }

  async function readAndCheck() {
    if (!file) return;
    setLoading(true);
    setProgress(0);
    setError(null);
    try {
      const Tesseract = await import("tesseract.js");
      const { data } = await Tesseract.recognize(file, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text" && typeof m.progress === "number") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });
      const text = data.text.trim();
      if (!text) {
        setError("Couldn't read any text from that photo. Try a sharper, well-lit shot.");
        return;
      }
      onResult(checkIngredientsText(text, "photo-label"));
    } catch {
      setError("Something went wrong reading that label. Try again with a clearer photo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-white">Photo of Ingredients Label</h2>
      <p className="mt-1 text-sm text-white/50">
        Snap or upload a clear photo of the ingredients text and I&rsquo;ll
        read it and check for gluten.
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
        id="label-photo-input"
      />

      {previewUrl ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Ingredients label preview" className="max-h-64 w-full object-contain bg-black" />
        </div>
      ) : (
        <label
          htmlFor="label-photo-input"
          className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-10 text-sm text-white/60 transition hover:border-emerald-500/40 hover:text-white"
        >
          <Upload className="h-4 w-4" />
          Tap to take a photo or upload a label image
        </label>
      )}

      {previewUrl && (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 text-sm text-white/40 hover:text-white"
        >
          Choose a different photo
        </button>
      )}

      <button
        onClick={readAndCheck}
        disabled={!file || loading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 font-medium text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Reading label… {progress}%
          </>
        ) : (
          "Read & Check Label"
        )}
      </button>

      {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
    </div>
  );
}
