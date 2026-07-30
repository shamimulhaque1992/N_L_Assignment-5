"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getAllProperties = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const accessToken = await validateAccessToken();
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties?${params.toString()}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result = await res.json();
  return result;
};
