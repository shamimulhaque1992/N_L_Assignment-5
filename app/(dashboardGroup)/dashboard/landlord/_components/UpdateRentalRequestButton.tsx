"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { updateRentalRequestStatus } from "@/app/(dashboardGroup)/dashboard/_actions/updateRentalRequestStatus";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UpdateRentalRequestButtonProps {
  rentalId: string;
  status: "APPROVED" | "REJECTED" | "COMPLETED" | "ACTIVE";
}

export default function UpdateRentalRequestButton({
  rentalId,
  status,
}: UpdateRentalRequestButtonProps) {
  const [state, action, pending] = useActionState(
    updateRentalRequestStatus.bind(null, rentalId, status),
    null,
  );

  useEffect(() => {
    if (!state?.success) return;
    if (state?.success) {
      toast.success(`Rental request ${status.toLowerCase()} successfully`);
    }
  }, [state, status]);

  const isApprove = status === "APPROVED";
  const isCompleted = status === "COMPLETED";

  return (
    <form action={action}>
      <Button
        type="submit"
        disabled={pending}
        size="sm"
        variant={
          isApprove ? "default" : isCompleted ? "outline" : "destructive"
        }
        className={`flex items-center gap-1.5 ${
          isApprove
            ? "bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white"
            : isCompleted
              ? "bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
              : "bg-rose-600 hover:bg-rose-700 text-white hover:text-white "
        }`}
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isApprove ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : isCompleted ? (
          <XCircle className="h-4 w-4" />
        ) : (
          <XCircle className="h-4 w-4" />
        )}
        {pending
          ? "Processing…"
          : isApprove
            ? "Approve"
            : isCompleted
              ? "Mark as completed"
              : "Reject"}
      </Button>
    </form>
  );
}
