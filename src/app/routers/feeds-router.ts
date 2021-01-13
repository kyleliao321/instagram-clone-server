import express from 'express';
import makeRouteCallback from '../utilities/route-callback';
import makeValidateRequest from '../utilities/validate-request';
import { GetPostFeedsQuerySchema } from '../utilities/schema';
import { RequestKeys } from '../utilities/constants';
import { getFeeds } from '../controller';

const feedsRouter = express.Router();

feedsRouter.get(
  '/',
  makeValidateRequest({
    schema: GetPostFeedsQuerySchema,
    key: RequestKeys.QUERY
  }),
  makeRouteCallback(getFeeds)
);

export default feedsRouter;
