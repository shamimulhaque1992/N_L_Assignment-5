"use client"

import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { deleteAProperty } from "../_actions/deleteAProperty";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const DeleteAPropertyButton = ({ propertyId }: { propertyId: string }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    deleteAProperty.bind(null, null, propertyId),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Property deleted successfully");

      router.refresh();
    } else {
      toast.error(state.message || "Failed to delete property");
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

export default DeleteAPropertyButton;
