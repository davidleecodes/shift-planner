import React from "react";
import { CodeForm } from "@/components/shared/CodeForm";

const CodesPage = async ({ params: { day } }: SearchParamProps) => {
  return (
    <div>
      <h3>{day}</h3>
      <CodeForm />
    </div>
  );
};

export default CodesPage;
