"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

export const getSingleProperty = async (propertyId: string) => {
  const accessToken = await validateAccessToken();

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
  const result = await res.json();

  if (!result?.success) {
    throw new Error("Failed to fetch single property");
  }

  return result;
};
