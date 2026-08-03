"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getTenantHistory = async (tenantId: string) => {
  const accessToken = await validateAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/landlord/tenants/${tenantId}/history`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["tenant-history"],
      },
    },
  );

  const result = await res.json();
  return result;
};
