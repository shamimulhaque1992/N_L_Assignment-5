"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getAllRentalRequests = async ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const accessToken = await validateAccessToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/rentals`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-cache",
    next: { tags: ["rentals-requests"] },
  });

  const result = await res.json();
  return result;
};
