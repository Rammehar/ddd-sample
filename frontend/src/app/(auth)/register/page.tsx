import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/shared/components/ui/button";

import { cn } from "@/shared/lib/utils";
import { UserRegisterForm } from "../../../modules/users/components/user-register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container flex relative   h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="h-full flex flex-col gap-4 z-20 items-center justify-center">
            <Image src="/logo.svg" alt="Logo" height={100} width={100} />
            <p className="text-xl font-medium">
              A Product of Brain Mentors Pvt ltd.
            </p>
            <p className="text-xs">We develop the IT Brains.</p>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to create your account
              </p>
            </div>
            <UserRegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and
              <Link
                href="/policy"
                className="underline underline-offset-4 hover:text-primary"
              >
                {" "}
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
