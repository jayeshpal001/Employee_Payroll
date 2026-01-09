
import { CheckCircle2 } from "lucide-react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => (
  <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-indigo-50/50 cursor-pointer hover:bg-indigo-50 transition-colors">
    <div className="relative flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-indigo-200 transition-all checked:border-indigo-600 checked:bg-indigo-600"
      />
      <CheckCircle2 size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
    </div>
    <span className="text-sm font-medium text-indigo-900">{label}</span>
  </label>
);