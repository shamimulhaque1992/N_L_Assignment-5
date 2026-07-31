"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getSingleRentalRequest = async (rentalId: string) => {
  const accessToken = await validateAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/rentals/${rentalId}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-cache",
    },
  );

  const result = await res.json();
  console.log(result, "result");
  return result;
};
