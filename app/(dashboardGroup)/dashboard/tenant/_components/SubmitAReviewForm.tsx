"use client";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { submitAReview } from "../_actions/submitAReview";
import { RentalRequest } from "./TanentTableActionButtons";

export default function SubmitAReviewForm({
  request,
}: {
  request: RentalRequest;
}) {
  console.log("🚀 ~ SubmitAReviewForm ~ request:", request);
  const router = useRouter();
  const [state, action, pending] = useActionState(
    submitAReview.bind(null, request?.property?.id),
    null,
  );
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Review submitted successfully");
      router.refresh();
    } else {
      toast.error(state.message || "Failed to submit review");
    }
  }, [state, router]);
  return (
    <form action={action} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="rating">
          Rating <span className="text-rose-500">*</span>
        </Label>
        <Select name="rating" required>
          <SelectTrigger id="rating" className="w-full">
            <SelectValue placeholder="Select a rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">⭐⭐⭐⭐⭐ (5)</SelectItem>
            <SelectItem value="4">⭐⭐⭐⭐ (4)</SelectItem>
            <SelectItem value="3">⭐⭐⭐ (3)</SelectItem>
            <SelectItem value="2">⭐⭐ (2)</SelectItem>
            <SelectItem value="1">⭐ (1)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="comment">
          Comment <span className="text-rose-500">*</span>
        </Label>
        <Textarea
          id="comment"
          name="comment"
          placeholder="Share your experience with this property..."
          rows={5}
          required
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Submit Review"}
        </Button>
      </DialogFooter>
    </form>
  );
}
