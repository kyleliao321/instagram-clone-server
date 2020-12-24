import express from 'express';
import makeRouteCallback from '../utilities/route-callback';
import makeValidateRequest from '../utilities/validate-request';
import {
  FollowUserBodySchema,
  CancelFollowingBodySchema,
  GetFollowersBodySchema,
  GetFollowingsBodySchema
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
  '/',
  makeValidateRequest({
    schema: CancelFollowingBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(cancelFollowing)
);

relationRouter.get(
  '/followers',
  makeValidateRequest({
    schema: GetFollowersBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(getFollowers)
);

relationRouter.get(
  '/followings',
  makeValidateRequest({
    schema: GetFollowingsBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(getFollowings)
);

export default relationRouter;
