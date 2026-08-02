"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { revalidateTag } from "next/cache";

export const updateAPropertyStatus = async (
  propertyId: string,
  newStatus: string,
) => {
  const accessToken = await validateAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties/${propertyId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status: newStatus }),
    },
  );
  const result = await res.json();
  if (result.success) {
    revalidateTag("my-properties", {
      expire: 0,
    });
  }
  return result;
};
