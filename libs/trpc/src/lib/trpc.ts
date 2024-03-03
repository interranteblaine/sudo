import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  greeting: publicProcedure.query(() => 'Welcome to trpc!'),
});

export function createBaseContext() {
  // Shared logic for context creation
  return {
    // Shared properties or functions
  };
}

export type AppRouter = typeof appRouter;
