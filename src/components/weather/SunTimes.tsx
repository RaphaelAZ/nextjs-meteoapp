import { Moon, Sun } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatTime } from "@/lib/utils/format";
import type { DailyForecast } from "@/types/weather";

interface SunTimesProps {
  today: DailyForecast;
  timezone: string;
}

export function SunTimes({ today, timezone }: SunTimesProps) {
  return (
    <Card title="Lever & coucher du soleil">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-amber-500/10 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
            <Sun className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Lever du soleil</p>
            <p className="text-xl font-semibold text-white">{formatTime(today.sunrise, timezone)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-indigo-500/10 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-400/20 text-indigo-300">
            <Moon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Coucher du soleil</p>
            <p className="text-xl font-semibold text-white">{formatTime(today.sunset, timezone)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
