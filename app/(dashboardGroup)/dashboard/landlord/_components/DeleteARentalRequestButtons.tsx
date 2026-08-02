"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
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
import { deleteARentalRequest } from "../../_actions/deleteARentalRequest";
import { toast } from "sonner";

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

const DeleteARentalRequestButtons = ({ item }: { item: RentalRequest }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    deleteARentalRequest.bind(null, null, item.id),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Request deleted successfully");
      router.refresh();
    } else {
      toast.error(state.message || "Failed to delete request");
    }
  }, [state, router]);

  return (
    <div className="flex items-center justify-start gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            className="bg-rose-600 hover:bg-rose-700 text-white hover:text-white"
          >
            <Trash className="h-4 w-4" />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this request?
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
              <Button variant="destructive" disabled={pending}>
                {pending ? "Deleting..." : "Delete"}
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteARentalRequestButtons;
