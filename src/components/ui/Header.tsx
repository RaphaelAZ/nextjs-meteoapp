import Link from "next/link";
import { CloudSun, GitCompareArrows } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 ring-1 ring-sky-400/30 transition group-hover:bg-sky-500/30">
            <CloudSun className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">MétéoApp</p>
            <p className="text-xs text-slate-300">Prévisions en temps réel</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/comparer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-white"
          >
            <GitCompareArrows className="h-4 w-4" />
            <span className="hidden sm:inline">Comparer</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
