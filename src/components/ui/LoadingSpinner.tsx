import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function LoadingSpinner({ label = "Chargement...", size = "md" }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-slate-300">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-sky-400`} />
      <p className="text-sm">{label}</p>
    </div>
  );
}
