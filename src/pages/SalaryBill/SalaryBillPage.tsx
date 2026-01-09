import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReactToPrint } from "react-to-print"; 
import { Printer } from "lucide-react";

import { useSalaryBill } from "../../hooks/useSalaryBill";
import { SalaryTabs } from "./SalaryTabs";
import { CreateSalaryForm } from "./CreateSalaryForm";
import { GenerateSalaryForm } from "./GenerateSalaryForm";
import { SalarySlip } from "./SalarySlip";
import { ErrorMessage, Button } from "../../components/ui"; 
import { getErrorMessage } from "../../utils/errorUtils";
import { Toast } from "../../components/ui/Toast";

export const SalaryBillPage = () => {
  const s = useSalaryBill();

  // --- 1. Print Logic Setup ---
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef, // This is the new standard for v7+
    documentTitle: `Salary_Slip_${s.employeeId || "Draft"}`,
    onAfterPrint: () => console.log("Printed successfully"),
  });

  // --- 2. Toast Logic ---
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  // Detect Success for Create
  useEffect(() => {
    if (s.createMeta.isSuccess) {
      setToast({
        msg: "Employee Record Created Successfully",
        type: "success",
      });
      setTimeout(() => setToast(null), 3000);
      s.setActiveTab("generate");
    }
  }, [s.createMeta.isSuccess]);

  // Detect Success for Generate
  useEffect(() => {
    if (s.billMeta.isSuccess) {
      setToast({ msg: "Salary Slip Generated & Printed", type: "success" });
      setTimeout(() => setToast(null), 3000);
    }
  }, [s.billMeta.isSuccess]);

  const globalError =
    s.employeesQuery.error || s.datasetsQuery.error || s.createMeta.error;

  return (
    <div className="min-h-screen bg-zinc-50 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-size-[20px_20px] flex items-center justify-center p-4 lg:p-8 font-sans text-zinc-900 overflow-hidden">
      {/* Toast Notification Layer */}
      <Toast
        message={toast?.msg || null}
        type={toast?.type || "success"}
        onClose={() => setToast(null)}
      />

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* --- LEFT PANEL --- */}
        <div className="lg:col-span-5 flex flex-col gap-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-zinc-200/50 rounded-full p-1.5"
          >
            <SalaryTabs activeTab={s.activeTab} onChange={s.setActiveTab} />
          </motion.div>

          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white border border-zinc-100 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] p-8 relative"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tighter text-zinc-900">
                {s.activeTab === "create" ? "New Record" : "Run Payroll"}
              </h1>
              <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                {s.activeTab === "create"
                  ? "Input employee details below to register them in the system database."
                  : "Configure the month and dataset settings to generate the final slip."}
              </p>
            </div>

            {globalError && (
              <div className="mb-6">
                <ErrorMessage message={getErrorMessage(globalError)} />
              </div>
            )}

            <div className="relative min-h-80">
              <AnimatePresence mode="wait">
                {s.activeTab === "create" ? (
                  <motion.div
                    key="create"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CreateSalaryForm
                      name={s.name}
                      salary={s.salary}
                      isPfEnabled={s.isPfEnabled}
                      showPFCheckbox={s.showPFCheckbox}
                      loading={s.createMeta.isLoading}
                      setName={s.setName}
                      setSalary={s.setSalary}
                      setApplyPF={s.setApplyPF}
                      onSubmit={s.handleCreateRecord}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="generate"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <GenerateSalaryForm
                      employees={s.employeesQuery.data || []}
                      datasets={s.datasetsQuery.data || []}
                      employeeId={s.employeeId}
                      datasetId={s.datasetId}
                      loading={s.billMeta.isLoading}
                      empLoading={s.employeesQuery.isLoading}
                      dsLoading={s.datasetsQuery.isLoading}
                      setEmployeeId={s.setEmployeeId}
                      setDatasetId={s.setDatasetId}
                      onGenerate={s.handleGenerateBill}
                    />

                    {/*Download Button Appears Here */}
                    {s.billMeta.data?.salaryStructure && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Button
                          text="Download / Print PDF"
                          icon={Printer}
                          onClick={() => handlePrint()}
                          className="bg-zinc-900 text-white hover:bg-zinc-800 border-none"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT PANEL: SLIP --- */}

        <div className="lg:col-span-7 sticky top-8 z-0">
          <div ref={componentRef} className="print:p-8">
            <SalarySlip
              billData={s.billMeta.data}
              employeeId={s.employeeId}
              loading={s.billMeta.isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
