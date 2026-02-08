"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = String(formData.get("password") || "");
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (password === adminPassword) {
    cookies().set("admin_auth", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/"
    });
    redirect("/admin");
  }

  redirect("/admin/login?error=1");
}
