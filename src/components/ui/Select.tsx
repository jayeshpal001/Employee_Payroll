import React from "react";
import {type LucideIcon, ChevronDown } from "lucide-react";
import { Label } from "./Label";

interface Option {
  id: string | number;
  name: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  icon?: LucideIcon;
}

export const Select = ({ label, options, icon, className, ...props }: SelectProps) => (
  <div className="w-full">
    {label && <Label icon={icon}>{label}</Label>}
    <div className="relative">
      <select
        {...props}
        className={`w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 
                 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 
                 transition-all duration-200 outline-none appearance-none cursor-pointer ${className || ""}`}
      >
        <option value="">Select an option...</option>
        {options?.map((o) => (
          <option key={o.id} value={o.id}>
           {o.id} {o.name}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronDown size={16} />
      </div>
    </div>
  </div>
);