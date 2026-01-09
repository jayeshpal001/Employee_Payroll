
import { AlertCircle } from "lucide-react";

export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg animate-in fade-in slide-in-from-top-2">
    <AlertCircle size={16} />
    {message}
  </div>
);