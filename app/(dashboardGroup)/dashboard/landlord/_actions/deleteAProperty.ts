"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { revalidateTag } from "next/cache";

type ActionState = {
  success: boolean;
  message: string;
  statusCode: number;
  data: { [key: string]: string | string[] | undefined };
} | null;

export const deleteAProperty = async (
  _initialState: ActionState,
  propertyId: string,
) => {
  const accessToken = await validateAccessToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties/${propertyId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("properties", { expire: 0 });
  }

  return result;
};
