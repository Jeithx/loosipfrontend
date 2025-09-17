import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { getTokenFromCookie } from "@/app/server/action";

const SERVICE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.loosip.com";

export const postProcedures = createTRPCRouter({
  createPost: baseProcedure.input(z.any()).mutation(async ({ input }) => {
    try {
      const response = await fetch(`${SERVICE_URL}/v1/api/Post`, {
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
        message:
          error instanceof Error ? error.message : "Failed to create post",
      });
    }
  }),
  deletePost: baseProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(
          `${SERVICE_URL}/v1/api/Post?id=${input.id}`,
          {
            method: "DELETE",
          }
        );
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
          message:
            error instanceof Error ? error.message : "Failed to delete post",
        });
      }
    }),
  getPosts: baseProcedure
    .input(
      z
        .object({
          pageNumber: z.number().default(1),
          pageSize: z.number().default(10),
        })
        .partial()
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams();
      const token = await getTokenFromCookie();
      if (input?.pageNumber)
        params.append("pageNumber", String(input.pageNumber));
      if (input?.pageSize) params.append("pageSize", String(input.pageSize));
      try {
        const response = await fetch(
          `${SERVICE_URL}/v1/api/Post?${params.toString()}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
          message:
            error instanceof Error ? error.message : "Failed to get posts",
        });
      }
    }),
  updatePost: baseProcedure.input(z.any()).mutation(async ({ input }) => {
    try {
      const response = await fetch(`${SERVICE_URL}/v1/api/Post`, {
        method: "PUT",
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
        message:
          error instanceof Error ? error.message : "Failed to update post",
      });
    }
  }),
  getPostById: baseProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      try {
        const response = await fetch(
          `${SERVICE_URL}/v1/api/Post/GetById?id=${input.id}`
        );
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
          message:
            error instanceof Error ? error.message : "Failed to get post by id",
        });
      }
    }),
  createPostComment: baseProcedure
    .input(z.any())
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(`${SERVICE_URL}/v1/api/PostComment`, {
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
          message:
            error instanceof Error
              ? error.message
              : "Failed to create post comment",
        });
      }
    }),
  deletePostComment: baseProcedure
    .input(z.any())
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(`${SERVICE_URL}/v1/api/PostComment`, {
          method: "DELETE",
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
          message:
            error instanceof Error
              ? error.message
              : "Failed to delete post comment",
        });
      }
    }),
  getPostComments: baseProcedure.input(z.any()).query(async ({ input }) => {
    const params = new URLSearchParams(input ? input : {});
    try {
      const response = await fetch(
        `${SERVICE_URL}/v1/api/PostComment?${params.toString()}`
      );
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
        message:
          error instanceof Error
            ? error.message
            : "Failed to get post comments",
      });
    }
  }),
  updatePostComment: baseProcedure
    .input(z.any())
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(`${SERVICE_URL}/v1/api/PostComment`, {
          method: "PUT",
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
          message:
            error instanceof Error
              ? error.message
              : "Failed to update post comment",
        });
      }
    }),
  createPostLike: baseProcedure.input(z.any()).mutation(async ({ input }) => {
    const token = await getTokenFromCookie();
    try {
      const response = await fetch(`${SERVICE_URL}/v1/api/PostLike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
        message:
          error instanceof Error ? error.message : "Failed to create post like",
      });
    }
  }),
  deletePostLike: baseProcedure.input(z.any()).mutation(async ({ input }) => {
    try {
      const response = await fetch(`${SERVICE_URL}/v1/api/PostLike`, {
        method: "DELETE",
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
        message:
          error instanceof Error ? error.message : "Failed to delete post like",
      });
    }
  }),
  deletePostMedia: baseProcedure.input(z.any()).mutation(async ({ input }) => {
    try {
      const response = await fetch(`${SERVICE_URL}/v1/api/PostMedia`, {
        method: "DELETE",
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
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete post media",
      });
    }
  }),
  updatePostMedia: baseProcedure.input(z.any()).mutation(async ({ input }) => {
    try {
      const response = await fetch(`${SERVICE_URL}/v1/api/PostMedia`, {
        method: "PUT",
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
        message:
          error instanceof Error
            ? error.message
            : "Failed to update post media",
      });
    }
  }),
  deletePostTag: baseProcedure.input(z.any()).mutation(async ({ input }) => {
    try {
      const response = await fetch(`${SERVICE_URL}/v1/api/PostTag`, {
        method: "DELETE",
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
        message:
          error instanceof Error ? error.message : "Failed to delete post tag",
      });
    }
  }),
});
