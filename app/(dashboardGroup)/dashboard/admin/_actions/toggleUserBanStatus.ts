"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { revalidateTag } from "next/cache";

type ActionState = {
  success: boolean;
  message: string;
  statusCode: number;
  data: { [key: string]: string | string[] | undefined };
} | null;

export const toggleUserBanStatus = async (
  userId: string,
  newStatus: string,
) => {
  const accessToken = await validateAccessToken();

  const status = newStatus;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/users/${userId}/moderate`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("all-users", { expire: 0 });
  }

  return result;
};
