"use client";

import { Button } from "@/components/ui/button";
import { Ban, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const handleButtonClick = (action: string) => {
    if (action === "view") {
      router.push(`/dashboard/tenant/requests/${item.id}/pay`);
    }
  };
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

      <Button
        variant="destructive"
        size="sm"
        className="flex items-center gap-1.5"
      >
        <Ban className="h-4 w-4" />
        Cancel
      </Button>
    </div>
  );
};

export default TenantTableActionButtons;
