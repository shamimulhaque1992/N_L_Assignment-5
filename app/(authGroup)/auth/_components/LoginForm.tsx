"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { ILoginStateType, loginAction } from "../_actions/loginAction";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const initialState: ILoginStateType = {
  success: false,
  statusCode: 0,
  message: "",
  data: {
    accessToken: "",
    refreshToken: "",
  },
};

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectToUrl = searchParams.get("redirectTo") || "";
  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectToUrl),
    initialState,
  );

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      return;
    }
    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const email = ((formData.get("email") as string) || "").trim();
    const password = (formData.get("password") as string) || "";

    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit}>
      <CardContent className="space-y-4 pt-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            className="h-10"
          />
          {errors.email && (
            <p className="text-xs text-rose-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="h-10"
          />
          {errors.password && (
            <p className="text-xs text-rose-500">{errors.password}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 pt-4">
        <Button
          type="submit"
          className="w-full h-10 font-semibold cursor-pointer"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Login"}
        </Button>
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?
          <Link
            href="/auth/register"
            className="text-primary underline font-medium hover:text-primary/80 transition-colors"
          >
            Register
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
