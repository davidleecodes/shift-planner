"use client";
import React from "react";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createLinks } from "@/constants";
import { usePathname } from "next/navigation";

const TabNav = () => {
  const pathname = usePathname();
  let res = createLinks.filter((link) => pathname.match(`${link.route}*`))[0];

  console.log("RES", res);
  return (
    <main>
      <Tabs
        // defaultValue="account"
        className="w-[400px]"
        value={res.label}
        // orientation="vertical"
      >
        <TabsList>
          {createLinks.map((link) => {
            return (
              <TabsTrigger value={link.label} key={link.route}>
                <Link href={link.route}>{link.label}</Link>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {/* <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
      </Tabs>
    </main>
  );
};

export default TabNav;
