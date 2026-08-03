"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getAllRequestOfMyProperties = async ({
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
      params.set("sortBy", query.sortBy as string);
    }
if (query.sortOrder) {
      params.set("sortOrder", query.sortOrder as string);
    }
    if (query.page) {
      params.set("page", query.page as string);
    }
    if (query.limit) {
      params.set("limit", query.limit as string);
    }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/landlord/rental-requests?${params.toString()}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-cache",
      next: { tags: ["rentals-requests-of-mine"] },
    },
  );

  const result = await res.json();
  return result;
};
