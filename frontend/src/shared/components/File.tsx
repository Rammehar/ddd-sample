"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuType } from "./Sidebar";

interface FileProps {
  menu: MenuType;
}
function File({ menu }: FileProps) {
  const pathname = usePathname();

  const isActive = pathname === `${menu.href}`;

  return (
    <div
      className={`flex items-center text-sm font-medium cursor-pointer ${
        isActive ? "text-blue-600" : ""
      }`}
    >
      <Link href={`${menu.href}`} className="flex items-center gap-2">
        <menu.icon size={16} /> <span>{menu.name}</span>
      </Link>
    </div>
  );
}

export default File;
