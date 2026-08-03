"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent, CardFooter } from "@/components/ui/card";
import { registerAction } from "../_actions/registerAction";
import { toast } from "sonner";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, null);
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    role?: string;
  }>({});

  useEffect(() => {
    if (!state) return;
    if (state?.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const name = ((formData.get("name") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim();
    const password = (formData.get("password") as string) || "";
    const phone = ((formData.get("phone") as string) || "").trim();

    const newErrors: typeof errors = {};

    // Email regex: validates standard email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Supports formats: 01XXXXXXXXX, +8801XXXXXXXXX, 8801XXXXXXXXX
    const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;

    if (!name) newErrors.name = "Full name is required";

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email =
        "Please enter a valid email address (e.g., name@example.com)";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone =
        "Please enter a valid Bangladesh phone number (e.g., 01XXXXXXXXX)";
    }

    if (!role) newErrors.role = "Please select a role";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              className="h-10"
            />
            {errors.name && (
              <p className="text-xs text-rose-500">{errors.name}</p>
            )}
          </div>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="01779312970"
              className="h-10"
            />
            {errors.phone && (
              <p className="text-xs text-rose-500">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Role <span className="text-rose-500">*</span>
            </Label>
            <Select name="role" value={role} onValueChange={setRole}>
              <SelectTrigger id="role" className="w-full h-10">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LANDLORD">Landlord</SelectItem>
                <SelectItem value="TENANT">Tenant</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-xs text-rose-500">{errors.role}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatar" className="text-sm font-medium">
              Avatar URL
            </Label>
            <Input
              id="avatar"
              name="avatar"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              className="h-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-sm font-medium">
            Bio
          </Label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Tell us a little bit about yourself..."
            rows={3}
            className="resize-none"
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 pt-4">
        <Button
          type="submit"
          className="w-full h-10 font-semibold cursor-pointer"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Register Account"}
        </Button>
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?
          <Link
            href="/auth/login"
            className="text-primary underline font-medium hover:text-primary/80 transition-colors"
          >
            Log in
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default RegisterForm;
