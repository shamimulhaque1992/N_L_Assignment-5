"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Oops! Something went wrong
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            An unexpected error occurred while loading this page. Please try
            again. If the problem continues, contact the administrator.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 max-h-40 w-full overflow-auto rounded-lg bg-muted p-4 text-left">
              <p className="break-all font-mono text-xs text-muted-foreground">
                {error.message}
              </p>
            </div>
          )}

          <Button
            size="lg"
            className="mt-8 w-full gap-2"
            onClick={() => unstable_retry()}
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
