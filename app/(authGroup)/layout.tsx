import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-muted/40 flex flex-col justify-center items-center p-4 sm:p-6">
      {children}
    </div>
  );
};

export default AuthLayout;
