"use client";
import React, { useState, useEffect } from "react";

export default function useEmployees(userId, orgId) {
  const [links, setLinks] = useState([]);

  const empToLinks = (employees) => {
    const employeeLinks = employees.map((employee) => ({
      label:
        employee.username ||
        `${employee.firstName} ${employee?.lastName && employee.lastName}`,
      route: `/generate/employees/${employee._id}`,
    }));
    return employeeLinks;
  };
  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    const fetchOrgId = async () => {
      try {
        const user = await getUserById(userId);
        console.log(isLoaded, setActive, userMemberships);
        console.log(user.organization_clerkId);
        await setActive({ organization: user.organization_clerkId });
        orgId = user.orgId;
      } catch (error) {
        console.log(error);
      }
    };
    const fetchData = async () => {
      try {
        const employees = await getAllOrgUsers(orgId);
        setLinks(empToLinks(employees));
        console.log(employees, orgId, userId);
      } catch (error) {
        console.log(error);
      }
    };
    if (orgId == undefined) fetchOrgId();
    fetchData();
  }, [isLoaded]);

  return [links, selected];
}
