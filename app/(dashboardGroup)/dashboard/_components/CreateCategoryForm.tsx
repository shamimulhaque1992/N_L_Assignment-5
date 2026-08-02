"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { createAPropertyCategory } from "@/app/(dashboardGroup)/dashboard/admin/_actions/createAPropertyCategory";
import { toast } from "sonner";

const CreateCategoryForm = () => {
  const [state, action, pending] = useActionState(
    createAPropertyCategory,
    null,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string || "").trim();

    if (!name) {
      e.preventDefault();
      setError("Category name is required");
    } else if (name.length < 2) {
      e.preventDefault();
      setError("Category name must be at least 2 characters");
    } else {
      setError("");
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit}>
      <div className="p-6">
        <div className="flex-1 space-y-2">
          <Label htmlFor="name">
            Category Name <span className="text-red-500">*</span>
          </Label>
          <Input id="name" name="name" placeholder="e.g. Flat" />
          {error && <p className="text-xs text-rose-500">{error}</p>}
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
