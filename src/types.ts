
export interface Employee {
  id: number;
  name: string;
  salary: number;
}

export interface Dataset {
  id: string;
  name: string;
}

export interface GenerateBillRequest {
  employeeId: number;
}

export interface SalaryBill {
  employeeName: string;
  totalSalary: number;
  baseSalary: number;
  pf: number;
  hra: number;
  ta: number;
  da: number;
  bonus: number;
  tax: number;
  netSalary: number;
}
