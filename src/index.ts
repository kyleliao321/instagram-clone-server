import express from 'express';
import bodyParser from 'body-parser';
import {
  register,
  login,
  getUserProfile,
  updateUserProfile
} from './controller';
import makeRouteCallback from './utilities/route-callback';
import makeValidateRequest from './utilities/validate-request';
import {
  LoginRequestBodySchema,
  RegisterRequestBodySchema,
  GetUserProfileRequestBodySchema,
  UpdateUserProfileRequestBodySchema
} from './utilities/schema';
import { RequestKeys } from './utilities/constants';
import {
  GetUserProfileRequestParamsSchema,
  UpdateUserProfileRequestParamsSchema
} from './utilities/schema/schemas';

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

app.listen(8080);
