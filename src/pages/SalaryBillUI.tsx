import { useState, useEffect } from "react";
import {
  User,
  Database,
  Banknote,
  FileText,
  Loader2,


  Building2,
  Hash,

} from "lucide-react";

import {
  useGetEmployeesQuery,
  useGetDatasetsQuery,
  useCreateSalaryRecordMutation,
  useGenerateBillMutation,
} from "../features/api/salaryApi";

// Assuming these accept generic props, otherwise ensure they rely on parent text colors
import {
  Input,
  Select,
  Checkbox,
  Button,
  ErrorMessage,
} from "../components/ui";

import { getErrorMessage } from "../utils/errorUtils";

/* ================= UTIL ================= */
const formatCurrency = (value?: number) =>
  typeof value === "number" ? value.toLocaleString("en-IN") : "0";

export const SalaryBillUI = () => {
  /* ================= UI STATE ================= */
  const [activeTab, setActiveTab] = useState<"create" | "generate">("create");

  /* ================= PHASE 1 STATES ================= */
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [isPfEnabled, setApplyPF] = useState(false);
  // const [recordId, setRecordId] = useState<number | null>(null);

  /* ================= PHASE 2 STATES ================= */
  const [employeeId, setEmployeeId] = useState("");
  const [datasetId, setDatasetId] = useState("");

  /* ================= API ================= */
  const {
    data: employees,
    isLoading: empLoading,
    error: empError,
  } = useGetEmployeesQuery();

  const {
    data: datasets,
    isLoading: dsLoading,
    error: dsError,
  } = useGetDatasetsQuery();

  const [
    createSalaryRecord,
    { isLoading: recordLoading, error: recordError },
  ] = useCreateSalaryRecordMutation();

  const [
    generateBill,
    { data: billData, isLoading: billLoading, error: billError },
  ] = useGenerateBillMutation();

  /* ================= LOGIC ================= */
  const showPFCheckbox = salary !== "" && Number(salary) < 15000;

  /* ---------- PHASE 1 ACTION ---------- */
  const handleCreateRecord = async () => {
    try {
      const numericSalary = Number(salary);
      const applyPFFinal =
        numericSalary < 12000
          ? isPfEnabled
          : numericSalary <= 30000
          ? true
          : false;

      const res = await createSalaryRecord({
        name,
        salary: numericSalary,
        isPfEnabled: applyPFFinal,
      }).unwrap();

      console.log("🔥 Phase-1 response:", res);
      // setRecordId(res.id);
      
      // UX: Auto-switch to generate tab and pre-fill if possible (logic depends on API response)
      setActiveTab("generate"); 
      
    } catch (err) {
      console.error("❌ Phase-1 Error:", err);
    }
  };

  /* ---------- PHASE 2 ACTION ---------- */
  const handleGenerateBill = async () => {
    if (!employeeId || !datasetId) return;

    try {
        const res = await generateBill({
            employeeId: Number(employeeId),
            datasetId: Number(datasetId),
        }).unwrap();
        console.log("🔥 Bill Generated:", res);
    } catch (error) {
        console.error("Error generating bill", error);
    }
  };

  /* ================= DEBUG ================= */
  useEffect(() => {
    if (billData) console.log("🟢 billData:", billData);
  }, [billData]);

  /* ================= DERIVED DATA ================= */
  const salaryStructure = billData?.salaryStructure;
  const attendance = billData?.attendance;
  const globalError = empError || dsError || recordError;

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 font-sans text-zinc-900">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* ================= LEFT PANEL: CONTROLS ================= */}
        <div className="bg-white rounded-xl shadow-lg border border-zinc-200 overflow-hidden">
          
          {/* Header & Tabs */}
          <div className="border-b border-zinc-100 p-6 pb-0">
            <h1 className="text-2xl font-bold tracking-tight mb-6">Payroll Manager</h1>
            
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("create")}
                className={`pb-3 text-sm font-medium transition-all relative ${
                  activeTab === "create" 
                    ? "text-black border-b-2 border-black" 
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                1. Create Record
              </button>
              <button
                onClick={() => setActiveTab("generate")}
                className={`pb-3 text-sm font-medium transition-all relative ${
                  activeTab === "generate" 
                    ? "text-black border-b-2 border-black" 
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                2. Generate Slip
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {!!globalError && (
              <ErrorMessage message={getErrorMessage(globalError)} />
            )}

            {/* ---------- TAB 1: CREATE ---------- */}
            {activeTab === "create" && (
              <div className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100 text-sm text-zinc-500 mb-4">
                  Define the base salary details here before processing the monthly slip.
                </div>

                <Input
                  label="Employee Name"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  // Assuming Input accepts className for B&W customization
                  className="focus:ring-zinc-500"
                />

                <Input
                  label="Annual / Monthly CTC"
                  type="number"
                  icon={Banknote}
                  value={salary}
                  onChange={(e: any) => setSalary(e.target.value)}
                  placeholder="e.g. 25000"
                />

                {showPFCheckbox && (
                  <div className="p-3 border border-zinc-200 rounded-lg">
                    <Checkbox
                      label="Enable Provident Fund (PF) Deduction"
                      checked={isPfEnabled}
                      onChange={setApplyPF}
                    />
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    text="Save Record & Proceed"
                    loading={recordLoading}
                    disabled={!name || !salary}
                    onClick={handleCreateRecord}
                    // Styling for black button
                    className="bg-black hover:bg-zinc-800 text-white w-full py-3 rounded-lg font-medium transition-colors"
                  />
                </div>
              </div>
            )}

            {/* ---------- TAB 2: GENERATE ---------- */}
            {activeTab === "generate" && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                 <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100 text-sm text-zinc-500 mb-4">
                  Select an employee and the dataset configuration to calculate the final payout.
                </div>

                {empLoading || dsLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin text-zinc-400" />
                  </div>
                ) : (
                  <>
                    <Select
                      label="Select Employee"
                      icon={User}
                      options={employees || []}
                      value={employeeId}
                      onChange={(e: any) => setEmployeeId(e.target.value)}
                    />

                    <Select
                      label="Configuration Dataset"
                      icon={Database}
                      options={datasets || []}
                      value={datasetId}
                      onChange={(e: any) => setDatasetId(e.target.value)}
                    />

                    <div className="pt-2">
                      <Button
                        text="Generate Payslip"
                        loading={billLoading}
                        disabled={!employeeId || !datasetId}
                        onClick={handleGenerateBill}
                        className="bg-black hover:bg-zinc-800 text-white w-full py-3 rounded-lg font-medium transition-colors"
                      />
                    </div>

                    {!!billError && (
                      <ErrorMessage message={getErrorMessage(billError)} />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT PANEL: REALISTIC BILL ================= */}
        <div className="flex flex-col h-full">
          {billLoading && (
            <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-xl shadow-lg border border-zinc-200 min-h-[500px]">
              <Loader2 className="animate-spin mb-4 text-zinc-800" size={32} />
              <p className="text-zinc-500 text-sm font-medium">Processing Payroll...</p>
            </div>
          )}

          {!billLoading && salaryStructure && (
            <div className="bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden relative">
              {/* Decorative top bar */}
              <div className="h-2 bg-zinc-900 w-full"></div>

              <div className="p-8 pb-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 border-b border-zinc-200 pb-6">
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                      <Building2 size={20} /> Company Inc.
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wide">
                      Payroll Statement
                    </p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-3xl font-serif font-bold text-zinc-900">Payslip</h3>
                    {attendance && (
                      <p className="text-zinc-500 text-sm mt-1 font-mono">
                        {attendance.month.toUpperCase()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Sub-Header / Employee Info */}
                <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                  <div>
                    <p className="text-zinc-400 uppercase text-xs font-semibold mb-1">Employee</p>
                    <p className="font-bold text-zinc-800 flex items-center gap-2">
                      <User size={14} /> 
                      {/* Name isn't directly in salaryStructure usually, relying on ID or passed prop. 
                          Using ID for display if name unavailable */}
                      ID: {employeeId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-zinc-400 uppercase text-xs font-semibold mb-1">Generated On</p>
                    <p className="font-mono text-zinc-800">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* The Bill Table */}
                <div className="border border-zinc-200 rounded-lg overflow-hidden mb-8">
                  <div className="bg-zinc-100 px-4 py-2 border-b border-zinc-200 flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-600">
                    <span>Description</span>
                    <span>Amount (INR)</span>
                  </div>

                  <div className="divide-y divide-zinc-100">
                    {Object.entries(salaryStructure).map(([key, value]) => {
                      if (key === "employeeName" || key === "isPfEnabled" || key === "netPay") return null;
                      
                      const isDeduction = key.toLowerCase().includes('deduction') || key.toLowerCase().includes('pt') || key.toLowerCase().includes('pf');
                      
                      return (
                        <div key={key} className="flex justify-between px-4 py-3 hover:bg-zinc-50 transition-colors">
                          <span className="capitalize text-zinc-700 text-sm font-medium">
                            {key.replace(/([A-Z])/g, " $1")}
                          </span>
                          <span className={`font-mono text-sm ${isDeduction ? 'text-red-900' : 'text-zinc-900'}`}>
                             {isDeduction ? '-' : ''}₹{formatCurrency(value as number)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total Net Pay Section */}
                <div className="bg-zinc-900 text-white rounded-lg p-6 flex justify-between items-center shadow-lg">
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">Total Net Payable</p>
                    <p className="text-xs text-zinc-500 mt-1">Direct Deposit</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold tracking-tight">
                      ₹{formatCurrency(salaryStructure.netPay)}
                    </span>
                  </div>
                </div>

                {/* Footer / Watermark */}
                <div className="mt-8 pt-6 border-t border-dashed border-zinc-300 flex justify-between items-end text-zinc-400">
                   <div className="flex flex-col gap-1">
                      <div className="h-8 w-32 border-b border-zinc-300 mb-1"></div>
                      <span className="text-[10px] uppercase">Employer Signature</span>
                   </div>
                   <div className="text-[10px] uppercase tracking-widest flex items-center gap-1">
                      <Hash size={10} /> System Generated
                   </div>
                </div>
              </div>
            </div>
          )}

          {!billLoading && !salaryStructure && (
            <div className="hidden lg:flex flex-col h-full items-center justify-center border-2 border-dashed border-zinc-300 rounded-xl bg-zinc-50/50 p-10 text-center opacity-70">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <FileText size={32} className="text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-zinc-700">No Slip Generated</h3>
              <p className="text-sm text-zinc-400 max-w-xs mt-2">
                Use the "Generate Slip" tab to process payroll data and view the document here.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};