"use server";

import { validateAccessToken } from "@/service/validateAccessToken";
import { cookies } from "next/headers";

interface SubmitAReviewState {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    [key: string]: string | undefined;
  };
}

export const submitAReview = async (
  propertyId: string,
  _previousState: SubmitAReviewState,
  formData: FormData,
) => {
  const accessToken = await validateAccessToken();

  const data = {
    rating: Number(formData.get("rating")),
    comment: formData.get("comment") as string,
    propertyId: propertyId,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  return result;
};
