"use client";

import React, { useActionState, useEffect } from "react";
import { createAPropertyRequest } from "../_actions/createAPropertyRequest";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SubmitRentalRequestButton = ({
  isAvailable,
  propetyId,
}: {
  isAvailable: boolean;
  propetyId: string;
}) => {
  const [state, action, pending] = useActionState(
    createAPropertyRequest.bind(null, propetyId),
    null,
  );
  useEffect(() => {
    if (!state?.success) {
      if (state?.message) {
        toast.error(state?.message);
      }
      return;
    }
    if (state?.success) {
      toast.success(state?.message || "Rental request submitted successfully");
    }
  }, [state]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          disabled={!isAvailable}
          className="w-full h-12 text-sm font-semibold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Send className="h-4 w-4" />
          {pending ? "Submitting request..." : "Submit Request"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit your rental request</DialogTitle>
          <DialogDescription>
            Your rental request will be reviewed by the porperty owner. Your
            will be notify after the review.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Share your experience with this property..."
              rows={5}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!isAvailable || pending}
              className="text-sm font-semibold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              {pending ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitRentalRequestButton;
