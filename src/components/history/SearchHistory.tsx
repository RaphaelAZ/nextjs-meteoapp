"use client";

import Link from "next/link";
import { Clock, History, X } from "lucide-react";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { buildCityUrl } from "@/lib/utils/slug";

export function SearchHistory() {
  const { history, clearHistory, removeFromHistory, isHydrated } = useSearchHistory();

  if (!isHydrated || history.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-sky-300" />
          <h2 className="text-lg font-semibold text-white">Historique des recherches</h2>
        </div>
        <button
          type="button"
          onClick={clearHistory}
          className="text-sm text-slate-400 transition hover:text-red-300"
        >
          Tout effacer
        </button>
      </div>

      <ul className="space-y-2">
        {history.map((entry) => (
          <li
            key={`${entry.id}-${entry.searchedAt}`}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-slate-900/30 px-3 py-2"
          >
            <Link href={buildCityUrl(entry)} className="min-w-0 flex-1 hover:text-sky-200">
              <p className="truncate font-medium text-white">{entry.name}</p>
              <p className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                {entry.admin1 ? `${entry.admin1}, ` : ""}
                {entry.country}
              </p>
            </Link>
            <button
              type="button"
              onClick={() => removeFromHistory(entry.id)}
              aria-label={`Supprimer ${entry.name} de l'historique`}
              className="rounded-full p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
