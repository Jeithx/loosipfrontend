import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";

const SERVICE_URL =
  "http://localhost:7129";

export const authProcedures = createTRPCRouter({
  loginContentCreator: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(`${SERVICE_URL}/v1/api/Auth/LoginContentCreator`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: data.message,
          });
        }
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to login as content creator",
        });
      }
    }),
  loginFan: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(`${SERVICE_URL}/v1/api/Auth/LoginFan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: data.message,
          });
        }
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to login as fan",
        });
      }
    }),
  registerContentCreator: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string(),
        phone: z.string(),
        userName: z.string(),
        displayName: z.string(),
        birthDate: z.string(),
        genderId: z.number(),
        countryId: z.number(),
        cityId: z.number(),
        prefferedLanguageId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(`${SERVICE_URL}/v1/api/Auth/RegisterContentCreator`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: data.message,
          });
        }
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to register content creator",
        });
      }
    }),
  registerFan: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string(),
        phone: z.string(),
        userName: z.string(),
        displayName: z.string(),
        birthDate: z.string(),
        genderId: z.number(),
        countryId: z.number(),
        cityId: z.number(),
        prefferedLanguageId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(`${SERVICE_URL}/v1/api/Auth/RegisterFan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: data.message,
          });
        }
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to register fan",
        });
      }
    }),
});
