import { LoaderCircle } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full border bg-card p-5 shadow-lg">
          <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
        </div>

        <div className="space-y-1 text-center">
          <h2 className="text-lg font-semibold">Loading...</h2>
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare everything.
          </p>
        </div>
      </div>
    </div>
  );
};

export default loading;
