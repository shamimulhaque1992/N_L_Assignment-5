"use server";

import { validateAccessToken } from "@/service/validateAccessToken";

type ActionState = {
  success: boolean;
  message: string;
  statusCode: number;
  data: { [key: string]: string | string[] | undefined };
} | null;

export const updateAProperty = async (
  propertyId: string,
  _initialState: ActionState,
  formData: FormData,
) => {
  const accessToken = await validateAccessToken();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const address = formData.get("address") as string;
  const categoryId = formData.get("categoryId") as string;
  const imagesGetAll = formData.getAll("images") as string[];
  const amenitiesRaw = formData.get("amenities") as string;

  const images = imagesGetAll
    .flatMap((img) => img.split(","))
    .map((s) => s.trim())
    .filter(Boolean);

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

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties/${propertyId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    },
  );

  const result = await res.json();

  return result;
};
