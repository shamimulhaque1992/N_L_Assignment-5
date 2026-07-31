"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { revalidateTag } from "next/cache";

export const cancelARentalRequest = async (rentalId: string) => {
  const accessToken = await validateAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/rentals/${rentalId}/cancel`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-cache",
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("rentals-requests", "max");
  }
  return result;
};
