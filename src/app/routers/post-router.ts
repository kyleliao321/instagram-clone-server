import express from 'express';
import makeRouteCallback from '../utilities/route-callback';
import makeValidateRequest from '../utilities/validate-request';
import {
  AddNewPostBodySchema,
  GetPostBodySchema,
  GetPostParamsSchema,
  GetPostsQuerySchema
} from '../utilities/schema';
import { RequestKeys } from '../utilities/constants';
import { getPost, getPosts, addNewPost } from '../controller';

const postRouter = express.Router();

postRouter.post(
  '/',
  makeValidateRequest({
    schema: AddNewPostBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(addNewPost)
);

postRouter.get(
  '/:postId',
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

postRouter.get(
  '/',
  makeValidateRequest({
    schema: GetPostsQuerySchema,
    key: RequestKeys.QUERY
  }),
  makeRouteCallback(getPosts)
);

export default postRouter;
