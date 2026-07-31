import Link from "next/link";
import { CircleX, RefreshCcw, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentCanceledPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 w-full">
      <Card className="w-full max-w-lg shadow-xl">
        <CardContent className="flex flex-col items-center p-10 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
            <CircleX className="h-14 w-14 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Payment Canceled
          </h1>

          <p className="mt-3 text-muted-foreground">
            Your payment was canceled and no charges were made. You can return
            and try again whenever you&apos;re ready.
          </p>

          <div className="my-8 w-full rounded-xl border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">
              If you experienced any issues during checkout, please contact our
              support team.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/payment">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Try Again
              </Link>
            </Button>

            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
