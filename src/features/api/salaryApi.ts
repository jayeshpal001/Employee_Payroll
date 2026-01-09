import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

/* =======================
   API
======================= */

export const salaryApi = createApi({
  reducerPath: "salaryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://employee-payroll-backend-1.onrender.com",
    headers: {
      "Content-Type": "application/json",
    },
  }),

  // 1️⃣ Add Tag Types here
  tagTypes: ["Employees"], 

  endpoints: (builder) => ({
    /* -------- PHASE 1: CREATE SALARY RECORD -------- */
    createSalaryRecord: builder.mutation<
      CreateSalaryRecordResponse,
      CreateSalaryRecordRequest
    >({
      query: (body) => ({
        url: "/employee",
        method: "POST",
        body,
      }),
      // 3️⃣ When this runs successfully, mark 'Employees' data as stale/dirty
      invalidatesTags: ["Employees"], 
    }),

    /* -------- FETCH EMPLOYEES -------- */
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees",
      // 2️⃣ Tell Redux this data belongs to the 'Employees' tag
      providesTags: ["Employees"], 
    }),

    /* -------- FETCH DATASETS -------- */
    getDatasets: builder.query<Dataset[], void>({
      query: () => "/datasets",
    }),

    /* -------- PHASE 2: GENERATE BILL -------- */
    generateBill: builder.mutation<
      GenerateBillResponse,
      GenerateBillRequest
    >({
      query: (body) => ({
        url: "/calculate-salary",
        method: "POST",
        body,
      }),
    }),
  }),
});

/* =======================
   HOOK EXPORTS
======================= */

export const {
  useCreateSalaryRecordMutation,
  useGetEmployeesQuery,
  useGetDatasetsQuery,
  useGenerateBillMutation,
} = salaryApi;