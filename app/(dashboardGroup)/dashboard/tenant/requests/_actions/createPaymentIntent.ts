"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createPaymentIntent = async (rentalRequestId: string) => {
  const accessToken = await validateAccessToken();
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/payments/create-intent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ rentalRequestId }),
    },
  );

  const result = await res.json();
  if (result.success && result.data.paymentUrl) {
    redirect(result.data.paymentUrl);
  }
  return result;
};
