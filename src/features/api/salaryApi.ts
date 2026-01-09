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

/**
 * Backend response example:
 * {
 *   id: 25,
 *   employeeName: "jayesh",
 *   salary: 200000,
 *   isPfEnabled: false
 * }
 */
export interface CreateSalaryRecordResponse {
  id: number; // ✅ ACTUAL KEY USED
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

/**
 * REAL backend generate response:
 * {
 *   attendance: {...},
 *   dataset: {...},
 *   employee: {...},
 *   salaryCalculation: {...},
 *   salaryStructure: {...}
 * }
 */
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
    baseUrl: "http://localhost:4000",
    headers: {
      "Content-Type": "application/json",
    },
  }),

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
    }),

    /* -------- FETCH EMPLOYEES -------- */
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees",
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
