export const getErrorMessage = (error: unknown): string => {
  if (!error) return "Something went wrong";
  
  if (typeof error === "string") return error;
  
  if (typeof error === "object" && error !== null) {
    if ("error" in error && typeof (error as any).error === "string") {
      return (error as any).error;
    }
    if ("message" in error && typeof (error as any).message === "string") {
      return (error as any).message;
    }
  }
  
  return "Unexpected error occurred";
};