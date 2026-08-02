"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { revalidateTag } from "next/cache";

type ActionState = {
  success: boolean;
  message: string;
  statusCode: number;
  data: { [key: string]: string | string[] | undefined };
} | null;

export const updateAPropertyCategory = async (
  categoryId: string,
  _initialState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const accessToken = await validateAccessToken();

  const name = formData.get("name") as string;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/categories/${categoryId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ name }),
      cache: "no-store",
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("categories", { expire: 0 });
  }

  return result;
};
