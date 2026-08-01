"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import UpdateRentalRequestButton from "./UpdateRentalRequestButton";

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

const LandlordTableActionButtons = ({ item }: { item: RentalRequest }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-start gap-2">
      <Button
        onClick={() => router.push(`/dashboard/landlord/requests/${item.id}`)}
        variant="outline"
        size="sm"
        className="flex items-center gap-1.5"
      >
        <Eye className="h-4 w-4" />
        View
      </Button>

      {item.status === "PENDING" && (
        <>
          <UpdateRentalRequestButton rentalId={item.id} status="APPROVED" />
          <UpdateRentalRequestButton rentalId={item.id} status="REJECTED" />
        </>
      )}
      {item.status === "ACTIVE" && (
        <>
          <UpdateRentalRequestButton rentalId={item.id} status="COMPLETED" />
        </>
      )}
    </div>
  );
};

export default LandlordTableActionButtons;
