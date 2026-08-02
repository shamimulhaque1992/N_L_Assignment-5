"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getTenantStat = async () => {
  const accessToken = await validateAccessToken();
  const res = await fetch(`${process.env.BACKEND_API_URL}/tenant/stats`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: { revalidate: 60 * 60 * 24, tags: ["tenant-stats"] },
  });
  const data = await res.json();
  return data;
};
