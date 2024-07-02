import React from "react";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createLinks } from "@/constants";
import TabNav from "@/components/shared/TabNav";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TabNav />
      <div>
        <div>{children}</div>
      </div>
    </div>
    // <main>
    //   <Tabs
    //     // defaultValue="account"
    //     className="w-[400px]"
    //     value={pathname}
    //     // orientation="vertical"
    //   >
    //     <TabsList>
    //       {createLinks.map((link) => {
    //         return (
    //           <TabsTrigger value={link.route} key={link.route}>
    //             <Link href={link.route}>{link.label}</Link>
    //           </TabsTrigger>
    //         );
    //       })}
    //     </TabsList>
    //     {/* <TabsContent value="account">
    //       Make changes to your account here.
    //     </TabsContent>
    //     <TabsContent value="password">Change your password here.</TabsContent> */}
    //   </Tabs>
    //   <div>
    //     <div>{children}</div>
    //   </div>
    // </main>
  );
};

export default layout;
