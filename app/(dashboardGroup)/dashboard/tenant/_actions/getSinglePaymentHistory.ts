"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getSinglePaymentHistory = async (paymentId: string) => {
  const accessToken = await validateAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/payments/${paymentId}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-cache",
    },
  );

  const result = await res.json();
  return result;
};
