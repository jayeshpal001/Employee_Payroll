import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

type ToastProps = {
  message: string | null;
  type: "success" | "error";
  onClose: () => void;
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl backdrop-blur-md border border-white/10"
          style={{
            backgroundColor: type === "success" ? "rgba(24, 24, 27, 0.95)" : "rgba(239, 68, 68, 0.95)",
            color: "white",
          }}
          onClick={onClose}
        >
          {type === "success" ? (
            <CheckCircle2 size={20} className="text-green-400" />
          ) : (
            <XCircle size={20} className="text-white" />
          )}
          <span className="font-medium text-sm tracking-wide pr-2">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};