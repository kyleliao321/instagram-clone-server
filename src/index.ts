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
  LoginRequestSchema,
  RegisterRequestSchema,
  GetUserProfileRequestSchema
} from './utilities/schema';
import { UpdateUserProfileRequestSchema } from './utilities/schema/schemas';

const app = express();

app.use(bodyParser.json());

app.post(
  '/register',
  makeValidateRequest({ schema: RegisterRequestSchema }),
  makeRouteCallback(register)
);

app.post(
  '/login',
  makeValidateRequest({ schema: LoginRequestSchema }),
  makeRouteCallback(login)
);

app.get(
  '/users/:userId',
  makeValidateRequest({ schema: GetUserProfileRequestSchema }),
  makeRouteCallback(getUserProfile)
);

app.put(
  '/users/:userId',
  makeValidateRequest({ schema: UpdateUserProfileRequestSchema }),
  makeRouteCallback(updateUserProfile)
);

app.listen(8080);
