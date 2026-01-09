import { motion } from "framer-motion";
import { Command, Hash, Loader2, ScanBarcode, UserCheck } from "lucide-react";
import { formatCurrency } from "../../utils/currency";

export const SalarySlip = ({ billData, employeeId, loading }: any) => {
  
  // 1. Loading State
  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-150 w-full bg-white/40 backdrop-blur-sm rounded-4xl border border-zinc-200 flex flex-col items-center justify-center gap-6"
      >
        <div className="relative">
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-zinc-900 rounded-full blur-xl"
            ></motion.div>
            <div className="bg-white p-5 rounded-2xl shadow-xl shadow-zinc-200 relative z-10">
                <Loader2 className="animate-spin text-zinc-900" size={32} />
            </div>
        </div>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Processing Payroll...</p>
      </motion.div>
    );
  }

  // 2. Empty State
  if (!billData?.salaryStructure) {
    return (
      <div className="h-150 w-full bg-zinc-100/50 border-2 border-dashed border-zinc-200 rounded-4xl flex flex-col items-center justify-center text-center p-8">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-zinc-100 flex items-center justify-center mb-6">
          <ScanBarcode size={48} className="text-zinc-300" strokeWidth={1} />
        </div>
        <h3 className="text-xl font-bold text-zinc-900">Ready to Print</h3>
        <p className="text-zinc-500 text-sm max-w-xs mt-2 leading-relaxed">
          Configure the payroll details on the left to generate the official transaction slip.
        </p>
      </div>
    );
  }

  const { salaryStructure, attendance } = billData;

  // --- LOGIC: Separate Earnings vs Deductions ---
  const ignoredKeys = ["netPay", "employeeName", "isPfEnabled", "breakdown", "breakDown"];
  const deductionKeys = ["pf", "pt", "tax", "tds", "tf"]; // Added 'tf' as per your request

  const allEntries = Object.entries(salaryStructure);
  
  const earnings = allEntries.filter(([key]) => 
    !ignoredKeys.includes(key) && !deductionKeys.includes(key.toLowerCase())
  );
  
  const deductions = allEntries.filter(([key]) => 
    deductionKeys.includes(key.toLowerCase())
  );

  // 3. The Animated Receipt
  return (
    <motion.div 
        className="relative perspective-1000"
        initial={{ opacity: 0, y: -50, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1.2 }}
    >
        {/* Paper Shadow / Glow */}
        <div className="absolute inset-0 bg-zinc-900/10 translate-y-8 translate-x-0 rounded-sm blur-2xl scale-95"></div>
        
        <div className="relative bg-white text-zinc-900 w-full overflow-hidden shadow-2xl" 
             style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
            
            {/* Serrated Edge Top */}
             <div className="absolute top-0 left-0 right-0 h-4 bg-zinc-900 z-20" 
                  style={{
                    maskImage: "radial-gradient(circle at 10px 10px, transparent 10px, black 11px)",
                    maskSize: "20px 20px",
                    maskPosition: "-10px -10px"
                  }}>
             </div>

            {/* Header Section */}
            <div className="pt-14 pb-8 px-10 bg-zinc-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Command size={100} />
                </div>
                
                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-3"
                        >
                            <Command size={14} /> Official Payslip
                        </motion.div>
                        <motion.h2 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-3xl font-bold tracking-tight"
                        >
                            Codes For Tomorrow
                        </motion.h2>
                    </div>
                    <div className="text-right">
                        <div className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-mono backdrop-blur-md border border-white/10 inline-block">
                            {attendance?.month || "CURRENT"}
                        </div>
                    </div>
                </div>
            </div>

            {/* EMPLOYEE NAME STRIP */}
            <div className="bg-zinc-50 border-b border-zinc-100 px-10 py-6 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500">
                        <UserCheck size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Employee Name</p>
                        <p className="text-xl font-bold text-zinc-900">
                            {salaryStructure.employeeName || "Unknown Employee"}
                        </p>
                    </div>
                 </div>
                 <div className="text-right">
                     <p className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Employee ID</p>
                     <p className="font-mono text-lg text-zinc-600">#{employeeId.toString().padStart(4, '0')}</p>
                 </div>
            </div>

            {/* Attendance Strip */}
            <div className="bg-white px-10 py-4 flex justify-between text-xs font-medium uppercase tracking-wider text-zinc-500 border-b border-dashed border-zinc-200">
                <span>Working Days: {attendance?.attendedDays || 0}</span>
                <span>Total Days: {attendance?.totalDays || 30}</span>
            </div>

            {/* === SALARY ITEMS SECTION === */}
            <div className="p-10 space-y-4">
                
                {/* 1. EARNINGS */}
                {earnings.map(([key, value], index) => (
                    <motion.div 
                        key={key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (index * 0.05) }}
                        className="flex justify-between items-end group"
                    >
                        <span className="text-sm font-medium text-zinc-500 capitalize group-hover:text-zinc-900 transition-colors pb-1 border-b border-transparent group-hover:border-zinc-200 border-dashed w-full mr-4">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-mono text-zinc-900 font-semibold text-lg ">
                            {formatCurrency(value as number)}
                        </span>
                    </motion.div>
                ))}

                {/* DIVIDER (If we have deductions) */}
                {deductions.length > 0 && earnings.length > 0 && (
                     <div className="my-4 border-t border-dashed border-zinc-200"></div>
                )}

                {/* 2. DEDUCTIONS (Red & Negative) */}
                {deductions.map(([key, value], index) => (
                    <motion.div 
                        key={key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + (index * 0.05) }}
                        className="flex justify-between items-end group"
                    >
                        <span className="text-sm font-bold text-red-400 capitalize pb-1 border-b border-transparent border-dashed w-full mr-4">
                            {key.toUpperCase()} Deduction
                        </span>
                        <span className="font-mono text-red-500 font-bold text-lg  ">
                             -{formatCurrency(value as number)}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Total Section */}
            <div className="bg-zinc-900 p-10 text-white">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-zinc-400 text-sm font-medium mb-1">Total Net Payable</p>
                        <div className="flex items-center gap-2 text-zinc-500 text-xs">
                            <Hash size={12} /> System Verified
                        </div>
                    </div>
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                        className="text-5xl font-bold tracking-tighter"
                    >
                        ₹{formatCurrency(salaryStructure.netPay)}
                    </motion.div>
                </div>
            </div>

            {/* Serrated Edge Bottom */}
            <div className="h-6 bg-transparent relative" 
                  style={{
                    backgroundImage: "radial-gradient(circle at 10px -5px, transparent 12px, #18181b 13px)",
                    backgroundSize: "20px 20px",
                    transform: "rotate(180deg)"
                  }}>
             </div>
        </div>
    </motion.div>
  );
};