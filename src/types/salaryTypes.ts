/* =======================
   COMMON TYPES
======================= */

export interface Employee {
  id: number;
  name: string;
  baseSalary?: number;
  isPfEnabled?: boolean;
}

export interface Dataset {
  id: number;
  name: string;
  description?: string;
  hoursPerDay?: number;
}

/* =======================
   PHASE 1: CREATE SALARY
======================= */

export interface CreateSalaryRecordRequest {
  name: string;
  salary: number;
  isPfEnabled: boolean;
}

export interface CreateSalaryRecordResponse {
  id: number;
  employeeName?: string;
  salary?: number;
  isPfEnabled?: boolean;
}

/* =======================
   PHASE 2: GENERATE BILL
======================= */

export interface GenerateBillRequest {
  employeeId: number;
  datasetId: number;
}

/* ---- Attendance ---- */
export interface Attendance {
  month: string;
  totalDays: number;
  totalHoursWorked: number;
  attendedDays: number;
  fullDays: number;
  halfDays: number;
}

/* ---- Salary Calculation ---- */
export interface SalaryCalculation {
  originalSalary: number;
  effectiveSalary: number;
  dailySalary: number;
  deductionApplied: boolean;
  deductionAmount: number;
}

/* ---- Salary Structure (UI USES THIS) ---- */
export interface SalaryStructure {
  employeeName: string;
  salary: number;
  isPfEnabled: boolean;
  baseSalary: number;
  hra: number;
  ta: number;
  da: number;
  bonus: number;
  pf: number;
  tax: number;
  netPay: number;
}

export interface GenerateBillResponse {
  attendance: Attendance;
  dataset: Dataset;
  employee: Employee;
  salaryCalculation: SalaryCalculation;
  salaryStructure: SalaryStructure;
}