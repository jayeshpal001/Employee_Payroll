import React from "react";
import { Loader2, type LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
  icon?: LucideIcon;
}

export const Button = ({ text, loading, icon: Icon, disabled, className, ...props }: ButtonProps) => (
  <button
    disabled={disabled || loading}
    {...props}
    className={`w-full relative overflow-hidden group py-4 px-6 rounded-xl font-bold text-sm tracking-wide text-white 
                flex items-center justify-center gap-3 transition-all duration-300 ease-out
                ${disabled || loading
                  ? "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200" 
                  : "bg-zinc-900 hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-500/20 hover:-translate-y-0.5 active:scale-[0.99]"} 
                ${className || ""}`}
  >
    {loading ? (
        <Loader2 size={18} className="animate-spin" />
    ) : (
        Icon && <Icon size={18} className="transition-transform group-hover:scale-110" />
    )}
    <span>{text}</span>
  </button>
);