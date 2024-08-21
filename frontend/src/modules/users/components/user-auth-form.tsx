"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/shared/components/icons";
import { baseURL } from "@/config";
import { login } from "../actions/login";
import { loginSchema } from "../form-schemas/login";

export function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (
    values
  ) => {
    const trimmedData = {
      ...values,
      email: values.email.trim(),
    };
    setError("");
    setIsLoading(true);
    startTransition(() => {
      login(trimmedData, callbackUrl)
        .then((data) => {
          if (data?.error) {
            reset();
            setError(data?.error);
            setIsLoading(false);
          } else {
            location.reload();
          }
        })
        .catch(() => {
          setError("Something went wrong");
          setIsLoading(false);
        });
    });
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", {
      callbackUrl: callbackUrl || `${baseURL}`,
    });
  };

  return (
    <div className={cn("grid gap-6")}>
      {error && <p className="text-sm text-rose-800">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="Enter your email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-red-700">{errors?.email?.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              {...register("password")}
              id="password"
              placeholder="Enter your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-xs text-red-700">
                {errors?.password?.message}
              </p>
            )}{" "}
          </div>
          <Button className="mt-4" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in
          </Button>
          <Link href="/forgot-password">
            <p className="text-sm">Forgot password</p>
          </Link>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
