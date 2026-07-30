"use client";

import React, { useActionState } from "react";
import { createAPropertyRequest } from "../_actions/createAPropertyRequest";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const SubmitRentalRequestButton = ({
  isAvailable,
  propetyId,
}: {
  isAvailable: boolean;
  propetyId: string;
}) => {
  const [state, action, pending] = useActionState(createAPropertyRequest.bind(null, propetyId), null);

  return (
    <form action={action}>
      <Button
        type="submit"
        size="lg"
        disabled={!isAvailable}
        className="w-full h-12 text-sm font-semibold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
      >
        <Send className="h-4 w-4" />
        {pending ? "Submitting request..." : "Submit Request"}
      </Button>
    </form>
  );
};

export default SubmitRentalRequestButton;
