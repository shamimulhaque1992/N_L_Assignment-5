"use client";

import React, { useActionState, useEffect } from "react";
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
  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      return;
    }
    toast.error(state.message);
  }, [state]);

  return (
    <form action={action}>
      <CardContent className="space-y-4 pt-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            className="h-10"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="h-10"
            required
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 pt-4">
        <Button
          type="submit"
          className="w-full h-10 font-semibold cursor-pointer"
        >
          {pending ? "Submitting..." : "Login"}
        </Button>
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
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
