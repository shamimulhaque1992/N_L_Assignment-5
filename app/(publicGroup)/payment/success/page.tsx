import Link from "next/link";
import { CheckCircle2, ArrowRight, Receipt } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 w-full">
      <Card className="w-full max-w-lg shadow-xl">
        <CardContent className="flex flex-col items-center p-10 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40">
            <CheckCircle2 className="h-14 w-14 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Payment Successful
          </h1>

          <p className="mt-3 text-muted-foreground">
            Thank you! Your payment has been processed successfully. Your
            transaction is complete and your property is now active.
          </p>

          <div className="my-8 w-full rounded-xl border bg-muted/40 p-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Receipt className="h-4 w-4" />
              Confirmation has been sent to your email.
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/dashboard/tenant">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" className="flex-1">
              <Link href="/properties">
                View Properties
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}