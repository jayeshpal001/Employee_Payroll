import React from "react";
import { type LucideIcon } from "lucide-react";
import { Label } from "./Label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
}

export const Input = ({ label, icon: Icon, className, ...props }: InputProps) => (
  <div className="w-full group">
    {label && <Label icon={Icon}>{label}</Label>}
    <div className="relative transition-all duration-300">
      <input
        {...props}
        className={`peer w-full px-5 py-4 rounded-xl border border-zinc-200 bg-white text-zinc-900 font-medium
                   placeholder:text-zinc-300
                   focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 focus:outline-none
                   disabled:bg-zinc-50 disabled:text-zinc-400
                   shadow-sm hover:border-zinc-300 transition-all duration-200 ${className || ""}`}
      />
      {/* Dynamic line effect on bottom */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-zinc-900 transition-all duration-300 group-hover:w-full peer-focus:w-full"></div>
    </div>
  </div>
);