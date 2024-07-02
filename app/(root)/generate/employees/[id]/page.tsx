import React from "react";
import { EmpForm } from "@/components/shared/EmpForm";
import { getUserById } from "@/lib/actions/user.actions";

const EmployeePage = async ({ params: { id } }: SearchParamProps) => {
  console.log(id);
  const employee = await getUserById(id);
  console.log(employee);
  return (
    <div>
      EmployeePage_{id}
      <EmpForm employee={employee} />
    </div>
  );
};

export default EmployeePage;
