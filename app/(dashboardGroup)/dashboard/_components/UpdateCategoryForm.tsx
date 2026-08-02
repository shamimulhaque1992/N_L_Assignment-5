"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import { updateAPropertyCategory } from "../admin/_actions/updateAPropertyCategory";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Category } from "../landlord/_components/PropertyTableActionButtons";

const UpdateCategoryForm = ({ item }: { item: Category }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    updateAPropertyCategory.bind(null, item.id),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Category updated successfully");
      router.refresh();
    } else {
      toast.error(state.message || "Failed to update category");
    }
  }, [state, router]);

  return (
    <form action={action} className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label htmlFor="update-category-name">
          Category Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="update-category-name"
          name="name"
          defaultValue={item.name}
          placeholder="e.g. Apartment"
          required
        />
      </div>

      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpdateCategoryForm;
