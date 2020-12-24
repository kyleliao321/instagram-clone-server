import express from 'express';
import makeRouteCallback from '../utilities/route-callback';
import makeValidateRequest from '../utilities/validate-request';
import {
  LikePostBodySchema,
  DislikePostBodySchema,
  GetLikedUsersQuerySchema
} from '../utilities/schema';
import { RequestKeys } from '../utilities/constants';
import { likePost, dislikePost, getLikedUsers } from '../controller';

const likeRouter = express.Router();

likeRouter.post(
  '/',
  makeValidateRequest({
    schema: LikePostBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(likePost)
);

likeRouter.delete(
  '/',
  makeValidateRequest({
    schema: DislikePostBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(dislikePost)
);

likeRouter.get(
  '/',
  makeValidateRequest({
    schema: GetLikedUsersQuerySchema,
    key: RequestKeys.QUERY
  }),
  makeRouteCallback(getLikedUsers)
);

export default likeRouter;
