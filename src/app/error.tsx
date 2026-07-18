"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
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
      <h1 className="mt-4 text-2xl font-bold text-white">Une erreur est survenue</h1>
      <p className="mt-2 text-slate-300">
        Impossible de charger cette page pour le moment. Veuillez réessayer.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20"
      >
        Réessayer
      </button>
    </div>
  );
}
