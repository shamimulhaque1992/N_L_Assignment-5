"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { revalidateTag } from "next/cache";

type ActionState = {
  success: boolean;
  message: string;
  statusCode: number;
  data: { [key: string]: string | string[] | undefined };
} | null;

export const createANewProperty = async (
  _initialState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const accessToken = await validateAccessToken();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const address = formData.get("address") as string;
  const categoryId = formData.get("categoryId") as string;
  const imagesRaw = formData.get("images") as string;
  const amenitiesRaw = formData.get("amenities") as string;

  const images = imagesRaw
    ? imagesRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const amenities = amenitiesRaw
    ? amenitiesRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const body = {
    title,
    description,
    price: Number(price),
    address,
    images,
    amenities,
    categoryId,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("properties", { expire: 0 });
  }

  return result;
};
