"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface LinkButtonProps {
  label: string;
  path: string;
}
export default function LinkButton({ label, path }: LinkButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(path);
  };
  return (
    <Button size="sm" onClick={handleClick} variant="default">
      <PlusIcon width="16" height="16" />
      {label}
    </Button>
  );
}
