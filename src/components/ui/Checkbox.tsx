import { Check } from "lucide-react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => (
  <label className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer group
    ${checked 
      ? "bg-zinc-900 border-zinc-900 shadow-md shadow-zinc-500/20" 
      : "bg-white border-zinc-200 hover:bg-zinc-50"}`}
  >
    <div className="relative flex items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only" // Hide default checkbox
      />
      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300
        ${checked ? "bg-white border-white" : "bg-transparent border-zinc-300 group-hover:border-zinc-400"}`}>
        <Check size={14} className={`text-zinc-900 transition-all duration-200 ${checked ? "scale-100" : "scale-0"}`} strokeWidth={4} />
      </div>
    </div>
    <span className={`text-sm font-semibold transition-colors duration-200 ${checked ? "text-white" : "text-zinc-700"}`}>
        {label}
    </span>
  </label>
);