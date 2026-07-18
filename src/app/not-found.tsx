import Link from "next/link";
import { CloudOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <CloudOff className="mx-auto h-10 w-10 text-slate-400" />
      <h1 className="mt-4 text-2xl font-bold text-white">Page introuvable</h1>
      <p className="mt-2 text-slate-300">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-sky-500/20 px-5 py-2 text-sm font-medium text-sky-200 ring-1 ring-sky-400/30 transition hover:bg-sky-500/30"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
