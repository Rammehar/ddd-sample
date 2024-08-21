import React from "react";
import {
  LayoutDashboard,
  LucideIcon,
  FingerprintIcon,
  Users,
  Lock,
  Shield,
  UserCircle2,
  KanbanSquare,
} from "lucide-react";
import Folder from "./Folder";
import File from "./File";
import Logo from "./Logo";

export type MenuType = {
  name: string;
  type: "root" | "link";
  icon: LucideIcon;
  href: string;
  contents?: MenuType[];
};

const menus: MenuType[] = [
  {
    name: "Dashboard",
    type: "link",
    icon: LayoutDashboard,
    href: "//dashboard",
  },
  {
    name: "IAM",
    type: "root",
    icon: FingerprintIcon,
    href: "#",
    contents: [
      {
        name: "Users",
        type: "link",
        icon: Users,
        href: "/iam/users",
      },
      {
        name: "Roles",
        type: "link",
        icon: Lock,
        href: "/iam/roles",
      },
      {
        name: "Permissions",
        type: "link",
        icon: Shield,
        href: "/iam/permissions",
      },
    ],
  },
  {
    name: "Leads",
    type: "link",
    icon: UserCircle2,
    href: "//leads",
  },
  // {
  //   name: "Activity",
  //   type: "link",
  //   icon: KanbanSquare,
  //   href: "//activities",
  // },
];
export default function Sidebar() {
  return (
    <div className="px-4 py-4">
      <Logo />
      <div className="flex flex-col gap-3 px-4 py-10">
        {menus.map((item) =>
          item.type === "root" ? (
            <Folder key={item.name} menu={item} />
          ) : (
            <File key={item.name} menu={item} />
          )
        )}
      </div>
    </div>
  );
}
