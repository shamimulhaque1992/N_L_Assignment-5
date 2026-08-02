"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
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

export default function ApproveRequestButton({
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
  ) => updateRentalRequestStatus(prevState, rentalId, "APPROVED");
  const [state, action, pending] = useActionState(boundAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || `Rental request approved successfully`);
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
          className="bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white"
        >
          <CheckCircle2 className="h-4 w-4" />
          Approve
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to approve this request?
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
              variant={"default"}
              className={`flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white`}
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              {pending ? "Processing…" : "Approve"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
