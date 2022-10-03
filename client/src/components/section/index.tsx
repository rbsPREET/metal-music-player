import React, { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  title: string;
};

export default function Section({
  children,
  className = "",
  title = "",
}: SectionProps) {
  const defaultClassNames = "min-h-[25vh] flex flex-col gap-5";
  return (
    <div className={`${defaultClassNames} ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl uppercase tracking-wider">{title}</h2>
        <button
          className="px-3 py-2 hover:ring-2 select-none touch-none
         focus-visible:ring-4 focus-visible:ring-white
         hover:ring-white rounded-sm text-primary hover:text-white bg-white hover:bg-primary"
        >
          Browse
        </button>
      </div>
      {children}
    </div>
  );
}
