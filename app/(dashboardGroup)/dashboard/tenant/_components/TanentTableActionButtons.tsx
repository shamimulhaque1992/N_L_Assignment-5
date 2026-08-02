"use client";

import { Button } from "@/components/ui/button";
import { Ban, Eye, HandCoins, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { cancelARentalRequest } from "../../_actions/cancleARentalRequest";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubmitAReviewForm from "./SubmitAReviewForm";
import { toast } from "sonner";
import { createPaymentIntent } from "../requests/_actions/createPaymentIntent";

export type RentalRequest = {
  id: string;
  propertyId: string;
  status: string;
  createdAt: string;
  property: {
    id: string;
    title: string;
  };
  [key: string]: unknown;
};

const TenantTableActionButtons = ({ item }: { item: RentalRequest }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    cancelARentalRequest.bind(null, null, item.id),
    null,
  );
  const [paymentState, paymentAction, paymentPending] = useActionState(
    createPaymentIntent.bind(null, item.id),
    null,
  );

  const handleButtonClick = (actionType: string) => {
    if (actionType === "view") {
      router.push(`/dashboard/tenant/requests/${item.id}/pay`);
    }
    if (actionType === "cancel") {
      startTransition(action);
    }
    if (actionType === "pay") {
      startTransition(paymentAction);
    }
  };

  useEffect(() => {
    if (!state && !paymentState) return;
    if (state?.success) {
      toast.success(state?.message || "Rental request cancelled successfully");
      router.refresh();
    } else if (paymentState?.success) {
      toast.success(paymentState?.message || "Payment successful");
      router.refresh();
    } else {
      toast.error(
        state?.message || paymentState?.message || "Failed to process",
      );
    }
  }, [state, paymentState, router]);

  return (
    <div className="flex items-center justify-start gap-2">
      <Button
        onClick={() => handleButtonClick("view")}
        variant="outline"
        size="sm"
        className="flex items-center gap-1.5"
      >
        <Eye className="h-4 w-4" />
        View
      </Button>

      {item?.status === "PENDING" && (
        <Button
          onClick={() => handleButtonClick("cancel")}
          variant="destructive"
          size="sm"
          disabled={pending}
          className="flex items-center gap-1.5"
        >
          <Ban className="h-4 w-4" />
          {pending ? "Cancelling..." : "Cancel"}
        </Button>
      )}
      {item?.status === "APPROVED" && (
        <Button
          onClick={() => handleButtonClick("pay")}
          variant="outline"
          size="sm"
          disabled={paymentPending}
          className="flex items-center gap-1.5"
        >
          <HandCoins className="h-4 w-4" />
          {paymentPending ? "Redirecting..." : "Pay"}
        </Button>
      )}

      <Dialog>
        <DialogTrigger asChild disabled={item.status !== "COMPLETED"}>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Pencil className="h-4 w-4" />
            Submit a review
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit a review</DialogTitle>
            <DialogDescription>
              Please share your feedback about your experience with this
              property.
            </DialogDescription>
          </DialogHeader>
          <SubmitAReviewForm request={item} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenantTableActionButtons;
