import React from "react";
import RegisterForm from "../_components/RegisterForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = async () => {
  return (
    <Card className="w-full max-w-xl shadow-xl border bg-card p-2 sm:p-4 my-6">
      <CardHeader className="space-y-1.5 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create an Account
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Join RentNest as a Landlord or Tenant
        </CardDescription>
      </CardHeader>
      <RegisterForm />{" "}
    </Card>
  );
};

export default RegisterPage;
