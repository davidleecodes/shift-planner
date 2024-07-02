
import React from "react";
import SideNav from "@/components/shared/SideNav";
import { codeLinks } from "@/constants";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <SideNav navLinks={codeLinks} />
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default layout;
