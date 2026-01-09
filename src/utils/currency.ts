export const formatCurrency = (value?: number) =>
  typeof value === "number" ? value.toLocaleString("en-IN") : "0";
