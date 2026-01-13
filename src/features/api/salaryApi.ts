import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Import types from the new file
import type {
  Employee,
  Dataset,
  CreateSalaryRecordRequest,
  CreateSalaryRecordResponse,
  GenerateBillRequest,
  GenerateBillResponse,
} from "../../types/salaryTypes"; // <-- Path adjust kr lena apne folder structure k hisab se

/* =======================
   API DEFINITION
======================= */
// const backendApi = import.meta.env.BACKEND_URL
// console.log(import.meta.env);

export const salaryApi = createApi({
  
  reducerPath: "salaryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL, // Ensure "VITE_" prefix if using Vite
    headers: {
      "Content-Type": "application/json",
    },
  }),

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
      invalidatesTags: ["Employees"],
    }),

    /* -------- FETCH EMPLOYEES -------- */
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees",
      providesTags: ["Employees"],
    }),

    /* -------- FETCH DATASETS -------- */
    getDatasets: builder.query<Dataset[], void>({
      query: () => "/datasets",
    }),

    /* -------- PHASE 2: GENERATE BILL -------- */
    generateBill: builder.mutation<GenerateBillResponse, GenerateBillRequest>({
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