"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getSingleUser = async (userId: string) => {
  const accessToken = await validateAccessToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/users/${userId}`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-cache",
  });

  const result = await res.json();
  return result;
};
