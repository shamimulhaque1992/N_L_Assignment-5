"use server";

import { getNewAccessToken } from "@/service/getNewAccessToken";

export const getSingleProperty = async (propertyId: string) => {
  const accessToken = getNewAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties/${propertyId}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["single-property"],
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch single property");
  }

  const data = await res.json();
  return data;
};
