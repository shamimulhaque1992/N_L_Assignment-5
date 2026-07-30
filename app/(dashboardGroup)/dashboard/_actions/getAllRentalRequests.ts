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
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["rental-requests"],
    },
  });

  const result = await res.json();
  console.log(result, "result");
  return result;
};
