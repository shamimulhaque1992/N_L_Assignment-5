"use server";

import { jwtUtils } from "@/utils/jwt";
import { cookies } from "next/headers";
import { getNewAccessToken } from "./getNewAccessToken";

export const validateAccessToken = async () => {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;

  const decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
      )
    : null;
  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET as string,
      )
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;
      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      accessToken = newAccessToken;
    }
  }

  return accessToken;
};
