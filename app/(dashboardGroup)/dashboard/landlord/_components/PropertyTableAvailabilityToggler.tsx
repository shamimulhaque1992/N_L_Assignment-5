"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Property } from "../properties/page";
import { startTransition, useActionState, useEffect } from "react";
import { updateAPropertyStatus } from "../_actions/updateAPropertyStatus";
import { toast } from "sonner";

type Props = {
  item: Property;
};

const PropertyTableAvailabilityToggler = ({ item }: Props) => {
  const [state, action, pending] = useActionState(
    updateAPropertyStatus.bind(
      null,
      item.id,
      item.status === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE",
    ),
    null,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  const handleStatusToggle = () => {
    startTransition(action);
  };

  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={item.status === "AVAILABLE"}
        onCheckedChange={handleStatusToggle}
        disabled={pending}
      />
      <Label>
        {pending
          ? "Updating..."
          : item.status === "AVAILABLE"
            ? "Available"
            : "Unavailable"}
      </Label>
    </div>
  );
};

export default PropertyTableAvailabilityToggler;
