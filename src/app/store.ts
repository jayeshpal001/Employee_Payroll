import { configureStore } from "@reduxjs/toolkit";
import { salaryApi } from "../features/api/salaryApi";

export const store = configureStore({
  reducer: {
    [salaryApi.reducerPath]: salaryApi.reducer
  },
  middleware: (gDM) => gDM().concat(salaryApi.middleware)
});
