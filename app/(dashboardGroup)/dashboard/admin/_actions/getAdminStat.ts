"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getAdmindStat = async () => {
  const accessToken = await validateAccessToken();
  const res = await fetch(`${process.env.BACKEND_API_URL}/admin/dashboard`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: { revalidate: 60 * 60 * 24, tags: ["landlord-stats"] },
  });
  const data = await res.json();
  return data;
};
