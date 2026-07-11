"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Camera, Loader2, ScanLine, Upload } from "lucide-react";
import { lookupBarcode } from "../lib/openFoodFacts";
import { CheckResult } from "../lib/types";
import type { IScannerControls } from "@zxing/browser";

export default function BarcodeTab({
  onResult,
}: {
  onResult: (result: CheckResult) => void;
}) {
  const [manualCode, setManualCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  async function runLookup(code: string) {
    setError(null);
    setLoading(true);
    try {
      const result = await lookupBarcode(code, "barcode");
      onResult(result);
    } catch (e) {
      if (e instanceof TypeError) {
        setError("Network error — check your connection and try again.");
      } else {
        setError(e instanceof Error ? e.message : "Something went wrong looking that up.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function startCamera() {
    setCameraError(null);
    try {
      const { BrowserMultiFormatReader } = await import("@zxing/browser");
      const reader = new BrowserMultiFormatReader();
      setCameraActive(true);
      const controls = await reader.decodeFromVideoDevice(
        undefined,
        videoRef.current ?? undefined,
        (result) => {
          if (result) {
            stopCamera();
            runLookup(result.getText());
          }
        }
      );
      controlsRef.current = controls;
    } catch {
      setCameraActive(false);
      setCameraError(
        "Couldn't access the camera. Check permissions, or use photo/manual entry instead."
      );
    }
  }

  function stopCamera() {
    controlsRef.current?.stop();
    controlsRef.current = null;
    setCameraActive(false);
  }

  async function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setLoading(true);
    const url = URL.createObjectURL(file);
    try {
      const { BrowserMultiFormatReader } = await import("@zxing/browser");
      const reader = new BrowserMultiFormatReader();
      const result = await reader.decodeFromImageUrl(url);
      await runLookup(result.getText());
    } catch {
      setError("Couldn't find a barcode in that photo. Try a clearer, closer shot.");
      setLoading(false);
    } finally {
      URL.revokeObjectURL(url);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Live Camera Scan</h2>
        <p className="mt-1 text-sm text-white/50">
          Point your camera at a barcode, filling most of the frame.
        </p>
        <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black">
          <video
            ref={videoRef}
            className={`aspect-video w-full object-cover ${cameraActive ? "" : "hidden"}`}
            muted
            playsInline
          />
          {!cameraActive && (
            <div className="flex aspect-video w-full items-center justify-center text-white/20">
              <Camera className="h-10 w-10" />
            </div>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          {!cameraActive ? (
            <button
              onClick={startCamera}
              className="flex-1 rounded-xl bg-emerald-500 py-2.5 font-medium text-emerald-950 transition hover:bg-emerald-400"
            >
              Start Camera
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="flex-1 rounded-xl bg-white/10 py-2.5 font-medium text-white transition hover:bg-white/15"
            >
              Stop Camera
            </button>
          )}
        </div>
        {cameraError && <p className="mt-2 text-sm text-rose-400">{cameraError}</p>}
      </div>

      <div className="flex items-center gap-3 text-xs text-white/30">
        <div className="h-px flex-1 bg-white/10" />
        or
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">Scan Barcode From Photo</h2>
        <p className="mt-1 text-sm text-white/50">
          Works everywhere, even when live camera is blocked. Get the barcode
          in focus, filling most of the frame.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handlePhotoUpload}
          className="hidden"
          id="barcode-photo-input"
        />
        <label
          htmlFor="barcode-photo-input"
          className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-6 text-sm text-white/60 transition hover:border-emerald-500/40 hover:text-white"
        >
          <Upload className="h-4 w-4" />
          Tap to photograph or upload the barcode
        </label>
      </div>

      <div className="flex items-center gap-3 text-xs text-white/30">
        <div className="h-px flex-1 bg-white/10" />
        or type it manually
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div>
        <p className="text-sm text-white/50">
          The number printed under the barcode, usually 12 or 13 digits.
        </p>
        <div className="mt-3 flex gap-2">
          <input
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="e.g. 0037466051200"
            inputMode="numeric"
            className="flex-1 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none"
          />
          <button
            onClick={() => runLookup(manualCode)}
            disabled={!manualCode.trim() || loading}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 font-medium text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
            Look up
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
      </div>
    </div>
  );
}
