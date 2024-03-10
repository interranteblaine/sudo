import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { UserRepository } from '@sudo/db';
import { UserService } from '@sudo/service-logic';

const db = new UserRepository();
const service = new UserService(db);

const userProcedure = publicProcedure.input(z.object({ userId: z.string() }));

export const userRouter = router({
  get: userProcedure.query(({ input }) => {
    console.log(`Fetching user with id: ${input.userId}`);
    const user = service.getUserById(input.userId);
    return user;
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ id: z.string(), name: z.string() }))
    .mutation((req) => {
      console.log(`Context: ${req.ctx.user.id}`);
      console.log(
        `Updating name for user with id: ${req.input.userId} to ${req.input.name}`
      );
      return { id: req.input.userId, name: req.input.name };
    }),
});
