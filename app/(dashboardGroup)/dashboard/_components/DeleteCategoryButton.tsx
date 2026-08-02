"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { deleteAPropertyCategory } from "../admin/_actions/deleteAPropertyCategory";
import { toast } from "sonner";

const DeleteCategoryButton = ({ categoryId }: { categoryId: string }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    deleteAPropertyCategory.bind(null, null, categoryId),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Category deleted successfully");
      router.refresh();
    } else {
      toast.error(state.message || "Failed to delete category");
    }
  }, [state, router]);

  return (
    <Button
      variant="destructive"
      disabled={pending}
      onClick={() => startTransition(action)}
    >
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteCategoryButton;
