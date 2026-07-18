"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function CityError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-red-400/20 bg-red-500/10 p-8 text-center">
      <AlertTriangle className="mx-auto h-10 w-10 text-red-300" />
      <h1 className="mt-4 text-2xl font-bold text-white">Erreur météo</h1>
      <p className="mt-2 text-slate-300">
        Les données météorologiques n&apos;ont pas pu être chargées pour cette ville.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="rounded-full bg-sky-500/20 px-5 py-2 text-sm font-medium text-sky-200 ring-1 ring-sky-400/30 transition hover:bg-sky-500/30"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
