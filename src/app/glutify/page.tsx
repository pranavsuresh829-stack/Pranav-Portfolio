"use client";

import { useEffect, useState } from "react";
import {
  Barcode,
  Camera,
  Type,
  BookOpen,
  MapPin,
  History as HistoryIcon,
  MessageSquarePlus,
} from "lucide-react";
import Disclaimer from "./components/Disclaimer";
import FeedbackModal from "./components/FeedbackModal";
import ResultCard from "./components/ResultCard";
import BarcodeTab from "./components/BarcodeTab";
import PhotoLabelTab from "./components/PhotoLabelTab";
import TextTab from "./components/TextTab";
import GuideTab from "./components/GuideTab";
import SpotsTab from "./components/SpotsTab";
import HistoryTab from "./components/HistoryTab";
import { CheckResult } from "./lib/types";
import { addHistoryEntry, ackDisclaimer, hasAckedDisclaimer, toggleHistorySaved } from "./lib/storage";

type TabId = "barcode" | "photo" | "text" | "guide" | "spots" | "history";

const TABS: { id: TabId; label: string; icon: typeof Barcode }[] = [
  { id: "barcode", label: "Barcode", icon: Barcode },
  { id: "photo", label: "Photo", icon: Camera },
  { id: "text", label: "Text", icon: Type },
  { id: "guide", label: "Guide", icon: BookOpen },
  { id: "spots", label: "Spots", icon: MapPin },
  { id: "history", label: "History", icon: HistoryIcon },
];

const SCAN_TABS: TabId[] = ["barcode", "photo", "text"];

export default function GlutifyPage() {
  const [activeTab, setActiveTab] = useState<TabId>("barcode");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setShowDisclaimer(!hasAckedDisclaimer());
  }, []);

  function handleResult(r: CheckResult) {
    const entry = addHistoryEntry(r);
    setResult(r);
    setSavedId(entry.id);
    setSaved(false);
  }

  function handleSave() {
    if (!savedId) return;
    toggleHistorySaved(savedId);
    setSaved((s) => !s);
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {showDisclaimer && (
        <Disclaimer
          onAck={() => {
            ackDisclaimer();
            setShowDisclaimer(false);
          }}
        />
      )}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}

      <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-emerald-950">
              <Barcode className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold leading-none">Glutify</p>
              <p className="text-xs text-white/40">Find foods you can eat</p>
            </div>
          </div>
          <button
            onClick={() => setShowFeedback(true)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10"
          >
            <MessageSquarePlus className="h-3.5 w-3.5" />
            Feedback
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Find foods you can eat.</h1>
        <p className="mt-2 text-white/50">
          Scan a barcode, snap the label, or paste ingredients — Glutify tells
          you in seconds if gluten&rsquo;s hiding in there.
        </p>

        <nav className="mt-6 flex gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-emerald-500 text-emerald-950" : "text-white/60 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          {activeTab === "barcode" && <BarcodeTab onResult={handleResult} />}
          {activeTab === "photo" && <PhotoLabelTab onResult={handleResult} />}
          {activeTab === "text" && <TextTab onResult={handleResult} />}
          {activeTab === "guide" && <GuideTab />}
          {activeTab === "spots" && <SpotsTab />}
          {activeTab === "history" && <HistoryTab />}
        </div>

        {SCAN_TABS.includes(activeTab) && (
          <div className="mt-6">
            <ResultCard result={result} onSave={result ? handleSave : undefined} saved={saved} />
          </div>
        )}
      </main>
    </div>
  );
}
