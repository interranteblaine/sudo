import { publicProcedure, router } from '../trpc';
import { userRouter } from './users';

export const appRouter = router({
  greeting: publicProcedure.query(() => 'Welcome to trpc!'),
  users: userRouter,
});

export type AppRouter = typeof appRouter;
