"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateRentalRequestStatus } from "../../_actions/updateRentalRequestStatus";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UpdateRentalRequestButtonProps {
  rentalId: string;
}

export default function RejectRequestButton({
  rentalId,
}: UpdateRentalRequestButtonProps) {
  const router = useRouter();
  const boundAction = (
    prevState: {
      success: boolean;
      message: string;
      statusCode: number;
      data?: unknown;
    } | null,
    _formData: FormData,
  ) => updateRentalRequestStatus(prevState, rentalId, "REJECTED");
  const [state, action, pending] = useActionState(boundAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || `Rental request rejected successfully`);
      router.refresh();
    } else {
      toast.error(state.message || "Failed to update request status");
    }
  }, [state, router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="bg-rose-600 hover:bg-rose-700 text-white hover:text-white"
        >
          <XCircle className="h-4 w-4" />
          Reject
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to reject this request?
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <form action={action}>
            <Button
              type="submit"
              disabled={pending}
              size="sm"
              variant={"destructive"}
              className={`flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white hover:text-white`}
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              {pending ? "Processing…" : "Reject"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
