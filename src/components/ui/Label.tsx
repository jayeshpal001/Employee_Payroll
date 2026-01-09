import React from "react";
import { type LucideIcon } from "lucide-react";

interface LabelProps {
  children: React.ReactNode;
  icon?: LucideIcon;
}

export const Label = ({ children, icon: Icon }: LabelProps) => (
  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 ml-1">
    {Icon && <Icon size={14} className="text-zinc-400" />}
    {children}
  </label>
);