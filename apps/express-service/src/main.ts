import { TrpcContext, appRouter } from '@sudo/trpc';
import express from 'express';
import cors from 'cors';
import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from '@trpc/server/adapters/express';

const SERVER_PORT = process.env.PORT || 3333;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 4200;
const DEV_USER_ID = 'DevUser12345';

const createExpressContext = ({
  req,
  res,
}: CreateExpressContextOptions): TrpcContext => {
  return {
    user: {
      id: DEV_USER_ID,
    },
  };
};

const app = express();

app.use(cors({ origin: `http://localhost:${FRONTEND_PORT}` }));

app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: createExpressContext,
  })
);

const server = app.listen(SERVER_PORT, () => {
  console.log(`Listening at http://localhost:${SERVER_PORT}/api/trpc`);
});
server.on('error', console.error);
