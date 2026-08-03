"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getAllMyProperties = async ({
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
    if (query.location) {
      params.set("address", query.location as string);
    }
    if (query.minPrice) {
      params.set("minPrice", query.minPrice as string);
    }
    if (query.maxPrice) {
      params.set("maxPrice", query.maxPrice as string);
    }
    if (query.categoryId) {
      params.set("categoryId", query.categoryId as string);
    }
    if (query.price) {
      params.set("price", query.price as string);
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
    if (query.amenities) {
      const list = (query.amenities as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      params.set("amenities", JSON.stringify(list));
    }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties/my-properties?${params.toString()}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
      next: {
        tags: ["my-properties"],
      },
    },
  );

  const result = await res.json();
  return result;
};
