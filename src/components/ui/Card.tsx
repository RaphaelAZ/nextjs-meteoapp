import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className = "", title }: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-md ${className}`}
    >
      {title ? <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2> : null}
      {children}
    </section>
  );
}
