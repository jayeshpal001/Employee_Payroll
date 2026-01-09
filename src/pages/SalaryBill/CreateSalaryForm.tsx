import { Banknote, UserCircle2 } from "lucide-react";
import { Input, Checkbox, Button } from "../../components/ui";

type Props = {
  name: string;
  salary: string;
  isPfEnabled: boolean;
  showPFCheckbox: boolean;
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
  showPFCheckbox,
  loading,
  setName,
  setSalary,
  setApplyPF,
  onSubmit,
}: Props) => {
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

      <div className={`transition-all duration-500 ease-out overflow-hidden ${showPFCheckbox ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-1"> {/* Padding for outline offset */}
            <Checkbox
            label="Enable Provident Fund (PF) Deduction"
            checked={isPfEnabled}
            onChange={setApplyPF}
            />
        </div>
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