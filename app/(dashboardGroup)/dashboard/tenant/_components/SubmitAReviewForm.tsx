"use client";

import { useActionState, useEffect, useState } from "react";
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
  const router = useRouter();
  const [rating, setRating] = useState("5");
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>(
    {},
  );
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const comment = ((formData.get("comment") as string) || "").trim();
    const newErrors: typeof errors = {};

    if (!rating) newErrors.rating = "Please select a rating";
    if (!comment) {
      newErrors.comment = "Comment is required";
    } else if (comment.length < 5) {
      newErrors.comment = "Comment must be at least 5 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        {" "}
        <Label htmlFor="rating">
          {" "}
          Rating <span className="text-rose-500">*</span>{" "}
        </Label>{" "}
        <input type="hidden" name="rating" value={rating} />{" "}
        <Select
          value={rating}
          onValueChange={(value) => {
            setRating(value);
            setErrors((prev) => ({ ...prev, rating: undefined }));
          }}
        >
          {" "}
          <SelectTrigger id="rating" className="w-full">
            {" "}
            <SelectValue placeholder="Select a rating" />{" "}
          </SelectTrigger>{" "}
          <SelectContent>
            {" "}
            <SelectItem value="5">⭐⭐⭐⭐⭐ (5)</SelectItem>{" "}
            <SelectItem value="4">⭐⭐⭐⭐ (4)</SelectItem>{" "}
            <SelectItem value="3">⭐⭐⭐ (3)</SelectItem>{" "}
            <SelectItem value="2">⭐⭐ (2)</SelectItem>{" "}
            <SelectItem value="1">⭐ (1)</SelectItem>{" "}
          </SelectContent>{" "}
        </Select>{" "}
        {errors.rating && (
          <p className="text-xs text-rose-500">{errors.rating}</p>
        )}{" "}
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
        />
        {errors.comment && (
          <p className="text-xs text-rose-500">{errors.comment}</p>
        )}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" disabled={pending}>
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
