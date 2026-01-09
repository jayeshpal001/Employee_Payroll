import React from "react";
import { Loader2, FileText,type LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
  icon?: LucideIcon;
}

export const Button = ({ text, loading, icon: Icon = FileText, disabled, className, ...props }: ButtonProps) => (
  <button
    disabled={disabled || loading}
    {...props}
    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/30 
              flex items-center justify-center gap-2 transition-all duration-300 transform
              ${disabled || loading
                ? "bg-gray-300 shadow-none cursor-not-allowed opacity-70" 
                : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-[0.98]"} 
              ${className || ""}`}
  >
    {loading ? <Loader2 size={20} className="animate-spin" /> : <Icon size={20} />}
    {text}
  </button>
);