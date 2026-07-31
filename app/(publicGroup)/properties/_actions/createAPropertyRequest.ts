"use server";

"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { revalidateTag } from "next/cache";

export const createAPropertyRequest = async (propertyId: string) => {
  const accessToken = await validateAccessToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/rentals`, {
    method: "POST",
    body: JSON.stringify({
      propertyId,
    }),
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
  });

  const result = await res.json();


  revalidateTag("single-property", {
    expire: 0,
  });
  return result;
};
