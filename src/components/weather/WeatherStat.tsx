import type { ReactNode } from "react";

interface WeatherStatProps {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
}

export function WeatherStat({ icon, label, value, hint }: WeatherStatProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 flex items-center gap-2 text-sky-200">{icon}</div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}
