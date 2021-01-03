import express from 'express';
import makeRouteCallback from '../utilities/route-callback';
import makeValidateRequest from '../utilities/validate-request';
import {
  FollowUserBodySchema,
  CancelFollowingParamSchema,
  GetFollowersParamSchema,
  GetFollowingsParamSchema
} from '../utilities/schema';
import { RequestKeys } from '../utilities/constants';
import {
  followUser,
  cancelFollowing,
  getFollowers,
  getFollowings
} from '../controller';

const relationRouter = express.Router();

relationRouter.post(
  '/',
  makeValidateRequest({
    schema: FollowUserBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(followUser)
);

relationRouter.delete(
  '/follower/:followerId/following/:followingId',
  makeValidateRequest({
    schema: CancelFollowingParamSchema,
    key: RequestKeys.PARAMS
  }),
  makeRouteCallback(cancelFollowing)
);

relationRouter.get(
  '/followers/:userId',
  makeValidateRequest({
    schema: GetFollowersParamSchema,
    key: RequestKeys.PARAMS
  }),
  makeRouteCallback(getFollowers)
);

relationRouter.get(
  '/followings/:userId',
  makeValidateRequest({
    schema: GetFollowingsParamSchema,
    key: RequestKeys.PARAMS
  }),
  makeRouteCallback(getFollowings)
);

export default relationRouter;
