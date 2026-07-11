"use client";

import { useEffect, useState } from "react";
import { MapPin, Trash2 } from "lucide-react";
import { addSafeSpot, getSafeSpots, removeSafeSpot } from "../lib/storage";
import { SafeSpot } from "../lib/types";

export default function SpotsTab() {
  const [spots, setSpots] = useState<SafeSpot[]>([]);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setSpots(getSafeSpots());
  }, []);

  function handleAdd() {
    if (!name.trim()) return;
    setSpots(addSafeSpot(name.trim(), notes.trim()));
    setName("");
    setNotes("");
  }

  function handleRemove(id: string) {
    setSpots(removeSafeSpot(id));
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-white">Add a Safe Spot</h2>
      <p className="mt-1 text-sm text-white/50">
        Keep a personal list of restaurants or stores you trust are
        gluten-free safe.
      </p>

      <div className="mt-4 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Place name"
          className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none"
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Notes (dedicated fryer, GF menu, etc.)"
          className="w-full resize-none rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          disabled={!name.trim()}
          className="w-full rounded-xl bg-emerald-500 py-2.5 font-medium text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add Spot
        </button>
      </div>

      <div className="mt-6 space-y-2">
        {spots.length === 0 && (
          <p className="text-sm text-white/30">No safe spots saved yet.</p>
        )}
        {spots.map((s) => (
          <div
            key={s.id}
            className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <div className="flex min-w-0 gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
              <div className="min-w-0">
                <p className="truncate font-medium text-white">{s.name}</p>
                {s.notes && <p className="text-sm text-white/50">{s.notes}</p>}
              </div>
            </div>
            <button
              onClick={() => handleRemove(s.id)}
              className="flex-shrink-0 text-white/30 hover:text-rose-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
