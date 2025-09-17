"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getTokenFromCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export async function getDecodedToken() {
  const token = await getTokenFromCookie();
  return token ? jwtDecode(token) : null;
}