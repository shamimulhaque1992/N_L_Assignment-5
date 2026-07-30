"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getAllCategories = async () => {
  const accessToken = await validateAccessToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/categories`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["categories"],
    },
  });

  const result = await res.json();
  return result;
};
