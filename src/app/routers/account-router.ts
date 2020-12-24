import express from 'express';
import makeRouteCallback from '../utilities/route-callback';
import makeValidateRequest from '../utilities/validate-request';
import {
  LoginRequestBodySchema,
  RegisterRequestBodySchema
} from '../utilities/schema';
import { RequestKeys } from '../utilities/constants';
import { register, login } from '../controller';
const accountRouter = express.Router();

accountRouter.post(
  '/register',
  makeValidateRequest({
    schema: RegisterRequestBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(register)
);

accountRouter.post(
  '/login',
  makeValidateRequest({
    schema: LoginRequestBodySchema,
    key: RequestKeys.BODY
  }),
  makeRouteCallback(login)
);

export default accountRouter;
