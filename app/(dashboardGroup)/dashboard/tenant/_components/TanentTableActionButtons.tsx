"use client";

import { Button } from "@/components/ui/button";
import { Ban, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { cancelARentalRequest } from "../../_actions/cancleARentalRequest";
type RentalRequest = {
  id: string;
  propertyId: string;
  status: string;
  createdAt: string;
  property: {
    title: string;
  };
  [key: string]: unknown;
};
const TenantTableActionButtons = ({ item }: { item: RentalRequest }) => {
  const [state, action, pending] = useActionState(
    cancelARentalRequest.bind(null, item.id),
    false,
  );
  const router = useRouter();
  const handleButtonClick = (actionType: string) => {
    if (actionType === "view") {
      router.push(`/dashboard/tenant/requests/${item.id}/pay`);
    }
    if (actionType === "cancel") {
      startTransition(action);
    }
  };

  useEffect(() => {
    if (state) {
      router.refresh();
    }
  }, [state]);
  return (
    <div className="flex items-center justify-start gap-2">
      <Button
        onClick={() => handleButtonClick("view")}
        variant="outline"
        size="sm"
        className="flex items-center gap-1.5"
      >
        <Eye className="h-4 w-4" />
        View
      </Button>

      {item?.status === "PENDING" && (
        <Button
          onClick={() => handleButtonClick("cancel")}
          variant="destructive"
          size="sm"
          className="flex items-center gap-1.5"
        >
          <Ban className="h-4 w-4" />
          {pending ? "Cancelling..." : "Cancel"}
        </Button>
      )}
    </div>
  );
};

export default TenantTableActionButtons;
