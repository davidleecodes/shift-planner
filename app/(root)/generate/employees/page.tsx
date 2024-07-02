import React from "react";
import { redirect } from "next/navigation";
import { SignedIn, auth } from "@clerk/nextjs";

const EmployeesPage = async () => {
  const { userId, orgId, sessionClaims } = auth();

  redirect(`/generate/employees/${sessionClaims.metaData.userId}`);

  // return <div>None</div>;
};

export default EmployeesPage;
