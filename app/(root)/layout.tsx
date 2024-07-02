import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import NavMenu from "@/components/shared/NavMenu";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />
      <div className="root-container">
        <NavMenu />

        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default layout;
