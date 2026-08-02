"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getAllCategories = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
} = {}) => {
  const accessToken = await validateAccessToken();
  const params = new URLSearchParams();
  if (query) {
    if (query.searchTerm) {
      params.set("searchTerm", query.searchTerm as string);
    }

    if (query?.limit) {
      params.set("limit", query.limit as string);
    }
    if (query?.page) {
      params.set("page", query.page as string);
    }
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/categories?${params.toString()}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["categories"],
      },
    },
  );

  const result = await res.json();
  return result;
};
