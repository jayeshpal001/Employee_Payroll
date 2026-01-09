import React from "react";
import {type LucideIcon } from "lucide-react";
import { Label } from "./Label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
}

export const Input = ({ label, icon, className, ...props }: InputProps) => (
  <div className="w-full">
    {label && <Label icon={icon}>{label}</Label>}
    <div className="relative group">
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 
                 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 
                 transition-all duration-200 outline-none placeholder:text-gray-400 ${className || ""}`}
      />
    </div>
  </div>
);