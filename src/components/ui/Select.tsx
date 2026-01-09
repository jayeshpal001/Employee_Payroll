import  { useState, useRef, useEffect } from "react";
import { type LucideIcon, ChevronDown, Check, ChevronsUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "./Label";

interface Option {
  id: string | number;
  name: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value: string | number;
  onChange: (value: string) => void; // Changed to return value directly for cleaner usage
  icon?: LucideIcon;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Select = ({
  label,
  options,
  value,
  onChange,
  icon: Icon,
  placeholder = "Select an option...",
  disabled = false,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the currently selected object to display its name
  const selectedOption = options.find((o) => String(o.id) === String(value));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionId: string | number) => {
    onChange(String(optionId));
    setIsOpen(false);
  };

  return (
    <div className={`w-full group ${className || ""}`} ref={containerRef}>
      {label && <Label icon={Icon}>{label}</Label>}
      
      <div className="relative">
        {/* TRIGGER BUTTON */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-5 py-4 rounded-xl border bg-white text-left font-medium flex items-center justify-between
                     transition-all duration-300 outline-none
                     ${isOpen 
                        ? "border-zinc-900 ring-1 ring-zinc-900 shadow-lg shadow-zinc-200/50" 
                        : "border-zinc-200 hover:border-zinc-300 shadow-sm"}
                     ${disabled ? "bg-zinc-50 text-zinc-400 cursor-not-allowed" : "cursor-pointer text-zinc-900"}
          `}
        >
          <span className={!selectedOption ? "text-zinc-400" : ""}>
            {selectedOption ? selectedOption.name : placeholder}
          </span>
          
          <span className={`text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-zinc-900" : ""}`}>
             {isOpen ? <ChevronDown size={18} strokeWidth={2.5} /> : <ChevronsUpDown size={16} />}
          </span>
        </button>

        {/* DROPDOWN MENU */}
        <AnimatePresence>
          {isOpen && !disabled && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute left-0 right-0 z-50 mt-1 overflow-hidden bg-white/90 backdrop-blur-xl rounded-xl border border-zinc-100 shadow-2xl shadow-zinc-300/50"
            >
              <div className="max-h-62.5 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent">
                {options.length === 0 ? (
                    <div className="p-4 text-center text-sm text-zinc-400">No options available</div>
                ) : (
                    options.map((option) => {
                    const isSelected = String(option.id) === String(value);
                    return (
                        <div
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200
                                    ${isSelected 
                                        ? "bg-zinc-100 text-zinc-900" 
                                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 hover:pl-5"}
                        `}
                        >
                        <span>{option.name}</span>
                        {isSelected && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-zinc-900"
                            >
                                <Check size={16} strokeWidth={3} />
                            </motion.span>
                        )}
                        </div>
                    );
                    })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};