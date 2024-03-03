import { createBaseContext, appRouter } from '@sudo/trpc';
import express from 'express';
import cors from 'cors';
import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from '@trpc/server/adapters/express';

const createExpressContext = ({ req, res }: CreateExpressContextOptions) => {
  const baseContext = createBaseContext();
  return {
    ...baseContext,
    req,
    res,
  };
};

const app = express();

app.use(cors());

app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: createExpressContext,
  })
);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/trpc`);
});
server.on('error', console.error);
