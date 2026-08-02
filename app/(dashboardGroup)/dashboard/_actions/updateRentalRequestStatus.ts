"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { revalidateTag } from "next/cache";

type ActionState = {
  success: boolean;
  message: string;
  statusCode: number;
  data?: unknown;
} | null;

export const updateRentalRequestStatus = async (
  _prevState: ActionState,
  rentalId: string,
  status: string,
): Promise<ActionState> => {
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
  console.log("🚀 ~ updateRentalRequestStatus ~ result:", result);

  if (result.success) {
    revalidateTag("rentals-requests", { expire: 0 });
  }
  return result;
};
