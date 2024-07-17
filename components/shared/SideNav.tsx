"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SideNav = ({
  navLinks,
  addLabel,
  onAddItem,
}: {
  navLinks: string[];
  addLabel: string;
  onAddItem: ({ name: string }) => {};
}) => {
  const pathname = usePathname();
  const [newItemName, setNewItemName] = useState("");

  const handleAddToCollection = () => {
    const data = { name: newItemName };
    onAddItem(data);
    setNewItemName("");
  };

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group  ${
                      isActive
                        ? "bg-purple-gradient text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    placeholder={addLabel}
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    // onPressEnter={handleAddToCollection}
                  />
                  <Button
                    onClick={handleAddToCollection}
                    disabled={!newItemName}
                  >
                    add
                  </Button>
                </div>
              </li>
            </ul>
          </SignedIn>
        </nav>
      </div>
    </aside>
  );
};

export default SideNav;
