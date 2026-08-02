"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useActionState } from "react";
import { createAPropertyCategory } from "@/app/(dashboardGroup)/dashboard/admin/_actions/createAPropertyCategory";
import { toast } from "sonner";

const CreateCategoryForm = () => {
  const [state, action, pending] = useActionState(
    createAPropertyCategory,
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={action}>
      <div className="p-6">
        <div className="flex-1 space-y-2">
          <Label htmlFor="name">
            Category Name <span className="text-red-500">*</span>
          </Label>
          <Input id="name" name="name" placeholder="e.g. Flat" required />
        </div>

        <div className="flex items-center gap-2 mt-4 justify-between">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={pending}>
            {pending ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateCategoryForm;
