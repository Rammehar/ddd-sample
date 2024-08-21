"use client";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
// import UserMenuDropdownMenu from "./UserMenuDropdown";
import { ModeToggle } from "@/components/theme-toggle-dropdown";
import { Settings } from "lucide-react";
import Logo from "./Logo";

export function Menu() {
  return (
    <Menubar className="bg-secondary flex items-center  rounded-none border-b px-16 justify-between">
      <div className="flex items-center">
        <Logo />

        <MenubarMenu>
          <MenubarTrigger className="relative pl-0">Sales</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/leads">Leads</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/tasks">Tasks</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/products">Products</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/">Deals</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/">Quotes</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="relative pl-0">Marketing</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/">Ads</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/">Email</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/">Social</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/">Campaigns</Link>
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Lead Capture</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>CTAs</MenubarItem>
                <MenubarItem>Forms</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="relative pl-0">Services</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/leads">Tickets</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="relative pl-0">Automation</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/leads">Workflows</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>

      <div className="ml-auto justify-end flex items-center space-x-4">
        {/* <UserMenuDropdownMenu /> */}
        <ModeToggle />
        <MenubarMenu>
          <MenubarTrigger className="relative pl-0">
            <Settings className="h-5 w-5" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/profile">Profile</Link>
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>IAM</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                <MenubarItem>
                  <Link href="/iam/users">Users</Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/iam/roles">Roles</Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/iam/permissions">Permissions</Link>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>
  );
}
