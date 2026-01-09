import { User, Database, Wand2 } from "lucide-react";
import { Select, Button } from "../../components/ui";

type Props = {
  employees: any[];
  datasets: any[];
  employeeId: string;
  datasetId: string;
  loading: boolean;
  empLoading: boolean;
  dsLoading: boolean;
  setEmployeeId: (v: string) => void;
  setDatasetId: (v: string) => void;
  onGenerate: () => void;
};

export const GenerateSalaryForm = ({
  employees,
  datasets,
  employeeId,
  datasetId,
  loading,
  empLoading,
  dsLoading,
  setEmployeeId,
  setDatasetId,
  onGenerate,
}: Props) => {
  return (
    <div className="space-y-6">
      <Select
        label="Select Employee"
        icon={User}
        options={employees}
        value={employeeId}
       onChange={(val) => setEmployeeId(val)} 
        disabled={empLoading}
        placeholder={empLoading ? "Loading employees..." : "Choose an employee"}
      />

      <Select
        label="Configuration Dataset"
        icon={Database}
        options={datasets}
        value={datasetId}
        onChange={(val) => setDatasetId(val)}
        disabled={dsLoading}
        placeholder={dsLoading ? "Loading datasets..." : "Choose a dataset"}
      />

      <div className="pt-4">
        <Button
            text="Generate Slip"
            icon={Wand2}
            loading={loading}
            disabled={!employeeId || !datasetId}
            onClick={onGenerate}
        />
      </div>
    </div>
  );
};