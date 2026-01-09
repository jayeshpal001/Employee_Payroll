// import { motion } from "framer-motion"; // Optional: Use standard conditional classes if motion not installed
// Assuming standard React for now to be safe, but styled like a pill switch

type Props = {
  activeTab: "create" | "generate";
  onChange: (tab: "create" | "generate") => void;
};

export const SalaryTabs = ({ activeTab, onChange }: Props) => {
  return (
    <div className="flex p-1 bg-zinc-100 rounded-2xl relative">
      {/* Sliding Background (Simulated with simple logic, best with LayoutId) */}
      <div 
        className={`absolute top-1 bottom-1 rounded-xl bg-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            activeTab === "create" ? "left-1 w-[calc(50%-4px)]" : "left-[50%] w-[calc(50%-4px)]"
        }`}
      ></div>

      <button
        onClick={() => onChange("create")}
        className={`flex-1 relative z-10 py-3 text-sm font-semibold transition-colors duration-200 ${
          activeTab === "create" ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
        }`}
      >
        Create Record
      </button>
      <button
        onClick={() => onChange("generate")}
        className={`flex-1 relative z-10 py-3 text-sm font-semibold transition-colors duration-200 ${
          activeTab === "generate" ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
        }`}
      >
        Generate Slip
      </button>
    </div>
  );
};