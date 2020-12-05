import express from 'express';
import bodyParser from 'body-parser';
import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  searchUserProfiles,
  followUser,
  cancelFollowing,
  getFollowers,
  getFollowings,
  addNewPost,
  getPost,
  getPosts,
  likePost
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
  CancelFollowingBodySchema,
  GetFollowersBodySchema,
  GetFollowingsBodySchema,
  AddNewPostBodySchema,
  GetPostParamsSchema,
  GetPostBodySchema,
  GetPostsBodySchema,
  LikePostBodySchema
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
  '/relation',
  makeValidateRequest({
    schema: FollowUserBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(followUser)
);

app.delete(
  '/relation',
  makeValidateRequest({
    schema: CancelFollowingBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(cancelFollowing)
);

app.get(
  '/relation/followers',
  makeValidateRequest({
    schema: GetFollowersBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(getFollowers)
);

app.get(
  '/relation/followings',
  makeValidateRequest({
    schema: GetFollowingsBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(getFollowings)
);

app.post(
  '/posts',
  makeValidateRequest({
    schema: AddNewPostBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(addNewPost)
);

app.get(
  '/posts/:postId',
  [
    makeValidateRequest({
      schema: GetPostParamsSchema,
      key: RequestKeys.PARAMS
    }),
    makeValidateRequest({
      schema: GetPostBodySchema,
      key: RequestKeys.BODY
    })
  ],
  makeRouteCallback(getPost)
);

app.get(
  '/posts',
  makeValidateRequest({
    schema: GetPostsBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(getPosts)
);

app.post(
  '/likes',
  makeValidateRequest({
    schema: LikePostBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(likePost)
);

app.listen(8080);
