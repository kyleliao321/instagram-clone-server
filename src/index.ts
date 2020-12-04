import express from 'express';
import bodyParser from 'body-parser';
import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  searchUserProfiles,
  followUser,
  cancelFollowing
} from './controller';
import makeRouteCallback from './utilities/route-callback';
import makeValidateRequest from './utilities/validate-request';
import {
  LoginRequestBodySchema,
  RegisterRequestBodySchema,
  GetUserProfileRequestBodySchema,
  UpdateUserProfileRequestBodySchema,
  GetUserProfileRequestParamsSchema,
  SearchUserProfilesRequestQuerySchema,
  UpdateUserProfileRequestParamsSchema,
  FollowUserBodySchema,
  CancelFollowingBodySchema
} from './utilities/schema';
import { RequestKeys } from './utilities/constants';

const app = express();

app.use(bodyParser.json());

app.post(
  '/register',
  makeValidateRequest({
    schema: RegisterRequestBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(register)
);

app.post(
  '/login',
  makeValidateRequest({
    schema: LoginRequestBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(login)
);

app.get(
  '/users',
  makeValidateRequest({
    schema: SearchUserProfilesRequestQuerySchema,
    key: RequestKeys.QUERY
  }),
  makeRouteCallback(searchUserProfiles)
);

app.get(
  '/users/:userId',
  [
    makeValidateRequest({
      schema: GetUserProfileRequestBodySchema,
      key: RequestKeys.BODY
    }),
    makeValidateRequest({
      schema: GetUserProfileRequestParamsSchema,
      key: RequestKeys.PARAMS
    })
  ],
  makeRouteCallback(getUserProfile)
);

app.put(
  '/users/:userId',
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

app.post(
  '/relation/follow',
  makeValidateRequest({
    schema: FollowUserBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(followUser)
);

app.post(
  '/relation/cancel',
  makeValidateRequest({
    schema: CancelFollowingBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(cancelFollowing)
);

app.listen(8080);
