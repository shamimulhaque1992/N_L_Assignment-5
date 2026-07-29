import { AppNavBar } from "@/components/shared/AppNavBar";
import React from "react";
import { getMyProfile } from "./auth/_actions/getMyProfile";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMyProfile();
  return (
    <div className="min-h-screen bg-muted/40">
      <AppNavBar user={user} />
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
