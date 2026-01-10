import { useEffect } from "react";
import { Banknote, UserCircle2 } from "lucide-react";
import { Input, Checkbox, Button } from "../../components/ui";

type Props = {
  name: string;
  salary: string;
  isPfEnabled: boolean;
  showPFCheckbox?: boolean; // Optional now, as logic is internal
  loading: boolean;
  setName: (v: string) => void;
  setSalary: (v: string) => void;
  setApplyPF: (v: boolean) => void;
  onSubmit: () => void;
};

export const CreateSalaryForm = ({
  name,
  salary,
  isPfEnabled,
  loading,
  setName,
  setSalary,
  setApplyPF,
  onSubmit,
}: Props) => {
  
  // --- NEW LOGIC START ---
  const salaryNum = parseFloat(salary) || 0;

  // 1. Define Conditions
  const isCompulsory = salaryNum >= 12000 && salaryNum <= 30000;
  const isNotApplicable = salaryNum > 30000;
  
  // 2. Auto-Update State based on Salary
  useEffect(() => {
    if (isCompulsory) {
        setApplyPF(true); // Force Checked
    } else if (isNotApplicable) {
        setApplyPF(false); // Force Unchecked
    }
    // If < 12000, we leave it to the user (no forced change)
  }, [salaryNum, isCompulsory, isNotApplicable, setApplyPF]);

  // 3. Determine UI Message & Disabled State
  let pfMessage = "";
  let isDisabled = false;

  if (isCompulsory) {
      pfMessage = "PF is Compulsory (Govt. Norms)";
      isDisabled = true;
  } else if (isNotApplicable) {
      pfMessage = "PF Not Applicable (Salary > 30k)";
      isDisabled = true;
  } else if (salaryNum > 0 && salaryNum < 12000) {
      pfMessage = "Optional for salary < 12k";
      isDisabled = false;
  }
  // --- NEW LOGIC END ---

  return (
    <div className="space-y-6">
      <Input
        label="Full Name"
        placeholder="e.g. John Doe"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
        icon={UserCircle2}
        autoFocus
      />

      <Input
        label="Base Salary (CTC)"
        type="number"
        placeholder="0.00"
        icon={Banknote}
        value={salary}
        onChange={(e: any) => setSalary(e.target.value)}
      />

      {/* We removed the show/hide animation because the checkbox is now always visible but changes state */}
      <div className="pt-2">
        <Checkbox
          label="Enable Provident Fund (PF) Deduction"
          checked={isPfEnabled}
          onChange={setApplyPF}
          disabled={isDisabled}
          message={pfMessage}
        />
      </div>

      <div className="pt-4">
        <Button
            text="Save Record"
            loading={loading}
            disabled={!name || !salary}
            onClick={onSubmit}
        />
      </div>
    </div>
  );
};