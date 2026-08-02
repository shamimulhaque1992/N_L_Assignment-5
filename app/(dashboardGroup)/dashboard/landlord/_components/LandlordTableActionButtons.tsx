"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteARentalRequestButtons from "./DeleteARentalRequestButtons";
import ApproveRequestButton from "./ApproveRequestButton";
import RejectRequestButton from "./RejectRequestButton";
import CompleteRequestButton from "./CompleteRequestButton";

type RentalRequest = {
  id: string;
  propertyId: string;
  status: string;
  createdAt: string;
  property: {
    id: string;
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
      <DeleteARentalRequestButtons item={item} />
      {item.status === "PENDING" && <ApproveRequestButton rentalId={item.id} />}
      {item.status === "PENDING" && <RejectRequestButton rentalId={item.id} />}
      {item.status === "ACTIVE" && <CompleteRequestButton rentalId={item.id} />}
    </div>
  );
};

export default LandlordTableActionButtons;
