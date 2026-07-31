"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createPaymentIntent } from "../_actions/createPaymentIntent";
import { toast } from "sonner";

export default function PayNowButton({
  rentalRequestId,
}: {
  rentalRequestId: string;
}) {
  const [state, action, pending] = useActionState(
    createPaymentIntent.bind(null, rentalRequestId),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (!state?.success) {
      toast.error(state?.message || "failed to start checkout");
    }
  }, [state]);

  return (
    <form action={action}>
      <input type="hidden" name="rentalRequestId" value={rentalRequestId} />
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {pending ? "Processing…" : "Pay Now"}
      </Button>
    </form>
  );
}
