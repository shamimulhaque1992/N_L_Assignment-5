import React from "react";
import LoginForm from "../_components/LoginForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <Card className="w-full max-w-md shadow-xl border bg-card p-2 sm:p-4">
      <CardHeader className="space-y-1.5 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Login to RentNest
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your credentials below to access your account
        </CardDescription>
      </CardHeader>
      <LoginForm />
    </Card>
  );
};

export default LoginPage;
