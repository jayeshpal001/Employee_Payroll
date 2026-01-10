import { Check, Lock } from "lucide-react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  message?: string;
}

export const Checkbox = ({ label, checked, onChange, disabled, message }: CheckboxProps) => (
  <div className="space-y-2">
    <label 
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group relative overflow-hidden
      ${disabled 
        ? "cursor-not-allowed opacity-90 bg-zinc-50 border-zinc-200" // Case 1: Disabled
        : checked 
            ? "cursor-pointer bg-zinc-900 border-zinc-900 shadow-md hover:bg-zinc-800" // Case 2: Checked (Stay Dark on Hover)
            : "cursor-pointer bg-white border-zinc-200 hover:bg-zinc-50" // Case 3: Unchecked (Light Hover)
      }`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        
        {/* Visual Box */}
        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300
          ${checked 
             ? (disabled ? "bg-zinc-400 border-zinc-400" : "bg-white border-white") 
             : "bg-transparent border-zinc-300 group-hover:border-zinc-400"
          }`}
        >
          {disabled && checked ? (
             <Lock size={12} className="text-white" />
          ) : (
             <Check size={14} className={`transition-all duration-200 ${checked ? "scale-100" : "scale-0"} ${checked && !disabled ? "text-zinc-900" : "text-white"}`} strokeWidth={4} />
          )}
        </div>
      </div>

      <div className="flex flex-col">
          <span className={`text-sm font-semibold transition-colors duration-200 
            ${disabled ? "text-zinc-500" : (checked ? "text-white" : "text-zinc-700")}
          `}>
              {label}
          </span>
      </div>

      {/* Disabled Strip Pattern */}
      {disabled && (
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.02)_75%,rgba(0,0,0,0.02)_100%)] bg-[length:10px_10px] pointer-events-none" />
      )}
    </label>

    {/* Message Display Logic */}
    {message && (
      <div className={`text-xs font-bold px-2 flex items-center gap-1.5 animate-in slide-in-from-top-1
        ${message.includes("Compulsory") ? "text-amber-600" : "text-zinc-400"}`}
      >
        {message.includes("Compulsory") && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
        {message}
      </div>
    )}
  </div>
);