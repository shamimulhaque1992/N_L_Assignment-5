"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getAllUsers = async ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const accessToken = await validateAccessToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/users`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-cache",
  });

  const result = await res.json();
  return result;
};
