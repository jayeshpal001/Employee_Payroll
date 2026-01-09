import { useState, useEffect } from "react";
import {
  useGetEmployeesQuery,
  useGetDatasetsQuery,
  useCreateSalaryRecordMutation,
  useGenerateBillMutation,
} from "../features/api/salaryApi";

export const useSalaryBill = () => {
  const [activeTab, setActiveTab] = useState<"create" | "generate">("create");

  // Phase 1
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [isPfEnabled, setApplyPF] = useState(false);

  // Phase 2
  const [employeeId, setEmployeeId] = useState("");
  const [datasetId, setDatasetId] = useState("");

  const employeesQuery = useGetEmployeesQuery();
  const datasetsQuery = useGetDatasetsQuery();

  const [createSalaryRecord, createMeta] =
    useCreateSalaryRecordMutation();

  const [generateBill, billMeta] =
    useGenerateBillMutation();

  const showPFCheckbox = salary !== "" && Number(salary) < 15000;

  const handleCreateRecord = async () => {
    const numericSalary = Number(salary);

    const applyPFFinal =
      numericSalary < 12000
        ? isPfEnabled
        : numericSalary <= 30000
        ? true
        : false;

    await createSalaryRecord({
      name,
      salary: numericSalary,
      isPfEnabled: applyPFFinal,
    }).unwrap();

    setActiveTab("generate");
  };

  const handleGenerateBill = async () => {
    if (!employeeId || !datasetId) return;

    await generateBill({
      employeeId: Number(employeeId),
      datasetId: Number(datasetId),
    }).unwrap();
  };

  useEffect(() => {
    if (billMeta.data) {
      console.log("billData:", billMeta.data);
    }
  }, [billMeta.data]);

  return {
    activeTab,
    setActiveTab,

    name,
    salary,
    isPfEnabled,
    employeeId,
    datasetId,

    setName,
    setSalary,
    setApplyPF,
    setEmployeeId,
    setDatasetId,

    showPFCheckbox,

    employeesQuery,
    datasetsQuery,
    createMeta,
    billMeta,

    handleCreateRecord,
    handleGenerateBill,
  };
};
