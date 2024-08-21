import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-2  hover:opacity-75 pr-6">
        <div className="rounded-full">
          <Image src={"/logo.svg"} height={30} width={30} alt="logo" />
        </div>
        <div className={cn(font.className)}>
          <p className="text-lg font-semibold">code and hire</p>
        </div>
      </div>
    </Link>
  );
}
