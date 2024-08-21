"use client";

import * as React from "react";
import { z } from "zod";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Icons } from "@/shared/components/icons";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema } from "../form-schemas/register";
import { registerUser } from "../actions/register";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = React.useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (
    data
  ) => {
    const result = await registerUser(data);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="fullname">
              FullName
            </Label>
            <Input
              {...register("full_name")}
              id="full_name"
              placeholder="Enter full name"
              type="text"
              autoCapitalize="none"
              autoComplete="full_name"
              autoCorrect="off"
              disabled={isSubmitting}
            />
            {errors.full_name && (
              <p className="text-xs text-red-700">
                {errors?.full_name?.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="Enter email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSubmitting}
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
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-xs text-red-700">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <Button disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}
