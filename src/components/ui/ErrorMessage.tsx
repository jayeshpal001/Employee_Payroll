import { AlertTriangle } from "lucide-react";

export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-start gap-3 p-4 text-sm font-medium text-red-600 bg-red-50/50 border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-2">
    <AlertTriangle size={18} className="shrink-0 mt-0.5" />
    <span>{message}</span>
  </div>
);