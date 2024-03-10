import { initTRPC } from '@trpc/server';

export interface TrpcContext {
  user: {
    id: string;
  };
}

const t = initTRPC.context<TrpcContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
