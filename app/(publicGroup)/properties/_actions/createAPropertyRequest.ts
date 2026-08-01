"use server";

"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { revalidateTag } from "next/cache";

export const createAPropertyRequest = async (
  propertyId: string,
  _initialData: unknown,
  formData: FormData,
) => {
  const accessToken = await validateAccessToken();
  const message = formData.get("message");
  const res = await fetch(`${process.env.BACKEND_API_URL}/rentals`, {
    method: "POST",
    body: JSON.stringify({
      propertyId,
      message,
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
