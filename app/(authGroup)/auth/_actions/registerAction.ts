"use server";

import { IUser } from "@/lib/types";
import { redirect } from "next/navigation";

export type IRegisterType = {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser;
};

export const registerAction = async (
  initialData: IRegisterType,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const phone = formData.get("phone");
  const role = formData.get("role");
  const avatar = formData.get("avatar");
  const bio = formData.get("bio");

  const payload = { email, password, name, phone, role, avatar, bio };

  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const result = await res.json();

  if (result.success) {
    redirect("/auth/login");
  }
  return result;
};
