import React from "react";
import {type LucideIcon } from "lucide-react";

interface LabelProps {
  children: React.ReactNode;
  icon?: LucideIcon;
}

export const Label = ({ children, icon: Icon }: LabelProps) => (
  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1.5 ml-1">
    {Icon && <Icon size={16} className="text-indigo-500" />}
    {children}
  </label>
);