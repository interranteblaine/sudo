import { TrpcContext, appRouter } from '@sudo/trpc';
import {
  awsLambdaRequestHandler,
  CreateAWSLambdaContextOptions,
} from '@trpc/server/adapters/aws-lambda';
import { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

const createLambdaContext = ({
  event,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2WithJWTAuthorizer>): TrpcContext => {
  const userId = event.requestContext.authorizer?.jwt.claims['sub'];
  if (typeof userId !== 'string') {
    throw new Error('User ID is missing or invalid in JWT claims');
  }
  return {
    user: {
      id: userId,
    },
  };
};

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext: createLambdaContext,
});
