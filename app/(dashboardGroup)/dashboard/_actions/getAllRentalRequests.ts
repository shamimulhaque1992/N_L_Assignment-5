"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getAllRentalRequests = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const accessToken = await validateAccessToken();
  const params = new URLSearchParams();

  if (query) {
    if (query.searchTerm) {
      params.set("searchTerm", query.searchTerm as string);
    }
    if (query.status) {
      params.set("status", query.status as string);
    }
    if (query.createdAt) {
      params.set("createdAt", query.createdAt as string);
    }
    if (query.page) {
      params.set("page", query.page as string);
    }
    if (query.limit) {
      params.set("limit", query.limit as string);
    }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/rentals?${params.toString()}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-cache",
      next: { tags: ["rentals-requests"] },
    },
  );

  const result = await res.json();
  return result;
};
