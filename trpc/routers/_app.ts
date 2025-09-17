import { authProcedures } from "@/modules/auth/server/procedures";
import { postProcedures } from "@/modules/posts/server/procedures";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  auth: authProcedures,
  post: postProcedures,
});

export type AppRouter = typeof appRouter;
