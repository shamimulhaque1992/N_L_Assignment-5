"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { revalidateTag } from "next/cache";

type ActionState = {
  success: boolean;
  message: string;
  statusCode: number;
  data?: unknown;
} | null;

export const deleteARentalRequest = async (
  _initialState: ActionState,
  rentalId: string,
): Promise<ActionState> => {
  const accessToken = await validateAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/rentals/${rentalId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-cache",
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("rentals-requests", { expire: 0 });
  }
  return result;
};
