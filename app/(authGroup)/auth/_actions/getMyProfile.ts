"use server";

import { cookies } from "next/headers";

export const getMyProfile = async () => {
  const cookeStore = await cookies();
  const accessToken = cookeStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/users/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["my-profile"],
    },
  });

  const result = await res.json();
  console.log("🚀 ~ getMyProfile ~ result:", result)
  return result;
};
