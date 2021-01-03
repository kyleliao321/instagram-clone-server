import express from 'express';
import makeRouteCallback from '../utilities/route-callback';
import makeValidateRequest from '../utilities/validate-request';
import {
  SearchUserProfilesRequestQuerySchema,
  GetUserProfileRequestBodySchema,
  GetUserProfileRequestParamsSchema,
  UpdateUserProfileRequestBodySchema,
  UpdateUserProfileRequestParamsSchema
} from '../utilities/schema';
import { RequestKeys } from '../utilities/constants';
import {
  searchUserProfiles,
  getUserProfile,
  updateUserProfile
} from '../controller';

const userRouter = express.Router();

userRouter.get(
  '/',
  makeValidateRequest({
    schema: SearchUserProfilesRequestQuerySchema,
    key: RequestKeys.QUERY
  }),
  makeRouteCallback(searchUserProfiles)
);

userRouter.get(
  '/:userId',
  [
    makeValidateRequest({
      schema: GetUserProfileRequestParamsSchema,
      key: RequestKeys.PARAMS
    })
  ],
  makeRouteCallback(getUserProfile)
);

userRouter.put(
  '/:userId',
  [
    makeValidateRequest({
      schema: UpdateUserProfileRequestBodySchema,
      key: RequestKeys.BODY
    }),
    makeValidateRequest({
      schema: UpdateUserProfileRequestParamsSchema,
      key: RequestKeys.PARAMS
    })
  ],
  makeRouteCallback(updateUserProfile)
);

export default userRouter;
