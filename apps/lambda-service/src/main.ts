import { createBaseContext, appRouter } from '@sudo/trpc';
import {
  awsLambdaRequestHandler,
  CreateAWSLambdaContextOptions,
} from '@trpc/server/adapters/aws-lambda';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

const createLambdaContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => {
  const baseContext = createBaseContext();
  return {
    ...baseContext,
    event,
    lambdaContext: context,
  };
};

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext: createLambdaContext,
});
