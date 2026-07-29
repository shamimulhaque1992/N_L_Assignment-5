"use server";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type ILoginStateType = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export const loginAction = async (
  redirectTo: string,
  initialData: ILoginStateType,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result: ILoginStateType = await res.json();

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 27 * 7,
      sameSite: "lax",
    });

    const decodedToken = jwt.decode(
      result.data.accessToken,
    ) as JwtPayload | null;
    const role =
      decodedToken && typeof decodedToken !== "string"
        ? decodedToken.role
        : null;

    if (
      redirectTo &&
      typeof redirectTo === "string" &&
      !redirectTo.startsWith("//") &&
      redirectTo.startsWith("/")
    ) {
      redirect(redirectTo);
    }
    if (role === "LANDLORD") {
      redirect("/dashboard/landlord");
    }

    if (role === "TENANT") {
      redirect("/dashboard/tenant");
    }
    if (role === "ADMIN") {
      redirect("/dashboard/admin");
    }
  }

  return result;
};
