import React from "react";
import EmpSideNav from "@/components/shared/EmpSideNav";
import { auth } from "@clerk/nextjs";
import { getAllOrgUsers } from "@/lib/actions/user.actions";

async function loadLinks(orgId) {
  const res = await getAllOrgUsers(orgId);
  const employeeLinks = res.map((employee) => ({
    label:
      employee.username ||
      `${employee.firstName} ${employee?.lastName && employee.lastName}`,
    route: `/generate/employees/${employee._id}`,
  }));
  return employeeLinks;
}

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { sessionClaims } = auth();

  let links = await loadLinks(Object.keys(sessionClaims.organization)[0]);
  console.log("LINK", links);
  return (
    <main className="root">
      <EmpSideNav links={links} />

      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default layout;
