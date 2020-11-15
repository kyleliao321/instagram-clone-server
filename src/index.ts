import express from 'express';
import bodyParser from 'body-parser';
import { register, login } from './controller';
import makeRouteCallback from './utilities/route-callback';
import makeValidateRequest from './utilities/validate-request';
import { LoginRequestSchema, RegisterRequestSchema } from './utilities/schemas';

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

app.listen(8080);
