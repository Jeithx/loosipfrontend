"use client";

import { create } from "zustand";
import nookies, { setCookie, destroyCookie } from "nookies";
import { jwtDecode } from "jwt-decode";
import { User } from "@/lib/types";

interface IAuth {
  token: string | null;
  user: User | null;
  setToken: (token: string, expiration: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  initializeFromToken: () => void;
}

export const useAuthStore = create<IAuth>((set) => {
  const domain = ".localhost";
  const initializeFromToken = () => {
    const cookies = nookies.get(null);
    if (cookies.token) {
      try {
        const decodedUser = jwtDecode(cookies.token) as User;
        set({
          token: `Bearer ${cookies.token}`,
          user: decodedUser,
        });
      } catch (err) {}
    }
  };

  if (typeof window !== "undefined") {
    initializeFromToken();
  }

  return {
    token: null,
    user: null,
    setToken: (token, expiration) => {
      try {
        const decodedUser = jwtDecode(token) as User;
        set({ token: `Bearer ${token}`, user: decodedUser });
        const expirationDate = new Date(expiration);
        const now = new Date();
        const maxAge = Math.floor((expirationDate.getTime() - now.getTime()) / 1000);
        setCookie(null, "token", token, {
          maxAge,
          path: "/",
          domain: domain,
        });
      } catch (error) {
        set({ token: `Bearer ${token}` });
      }
    },
    setUser: (user) => {
      set({ user });
    },
    logout: () => {
      destroyCookie(null, "token", {
        path: "/",
        domain: domain,
      });
      set({ token: null, user: null });
    },
    initializeFromToken,
  };
});
