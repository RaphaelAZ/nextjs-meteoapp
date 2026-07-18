"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { buildCityUrl } from "@/lib/utils/slug";
import type { GeoLocation } from "@/types/weather";

export function CitySearch() {
  const router = useRouter();
  const { addToHistory } = useSearchHistory();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/geocode?q=${encodeURIComponent(trimmed)}`);
      if (!response.ok) throw new Error("Erreur de recherche");
      const data = (await response.json()) as GeoLocation[];
      setSuggestions(data);
      setOpen(data.length > 0);
      setHighlightedIndex(-1);
    } catch {
      setSuggestions([]);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      void fetchSuggestions(query);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSuggestions]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectCity = (city: GeoLocation) => {
    addToHistory(city);
    setQuery("");
    setSuggestions([]);
    setOpen(false);
    router.push(buildCityUrl(city));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault();
      selectCity(suggestions[highlightedIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          role="combobox"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher une ville..."
          aria-label="Rechercher une ville"
          aria-expanded={open}
          aria-controls="city-search-listbox"
          aria-autocomplete="list"
          className="w-full rounded-2xl border border-white/10 bg-white/10 py-4 pl-12 pr-12 text-white placeholder:text-slate-400 outline-none transition focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
        />
        {loading ? (
          <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-sky-300" />
        ) : query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
              setOpen(false);
            }}
            aria-label="Effacer la recherche"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      {open && suggestions.length > 0 ? (
        <ul
          id="city-search-listbox"
          role="listbox"
          className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-md"
        >
          {suggestions.map((city, index) => (
            <li key={city.id} role="option" aria-selected={index === highlightedIndex}>
              <button
                type="button"
                onClick={() => selectCity(city)}
                className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-sky-500/10 ${
                  index === highlightedIndex ? "bg-sky-500/10" : ""
                }`}
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                <span>
                  <span className="block font-medium text-white">{city.name}</span>
                  <span className="block text-sm text-slate-400">
                    {city.admin1 ? `${city.admin1}, ` : ""}
                    {city.country}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
