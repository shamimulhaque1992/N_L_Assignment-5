"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { revalidateTag } from "next/cache";

export const updateRentalRequestStatus = async (
  rentalId: string,
  status: "APPROVED" | "REJECTED" | "CANCELED",
) => {
  const accessToken = await validateAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/rentals/${rentalId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({
        status,
      }),
      cache: "no-cache",
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("rentals-requests", "max");
  }
  return result;
};
