"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getLandLordStat = async () => {
  const accessToken = await validateAccessToken();
  const res = await fetch(`${process.env.BACKEND_API_URL}/landlord/stats`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: { revalidate: 60 * 60 * 24, tags: ["landlord-stats"] },
  });
  const data = await res.json();
  return data;
};
