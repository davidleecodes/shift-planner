import React from "react";
import SideNav from "@/components/shared/SideNav";
import { codeLinks } from "@/constants";
import { redirect } from "next/navigation";

const CodesPage = async () => {
  // return <div>None</div>;
  redirect(codeLinks[1].route);
};

export default CodesPage;
