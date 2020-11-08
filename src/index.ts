import express from 'express';
import bodyParser from 'body-parser';
import { register } from './controller';
import makeRouteCallback from './utilities/route-callback';
import makeValidateRequest from './utilities/validate-request';
import { RegisterRequestSchema } from './utilities/schemas';

const app = express();

app.use(bodyParser.json());

app.post('/register', makeValidateRequest({ schema: RegisterRequestSchema }), makeRouteCallback(register));

app.listen(8080, () => {
    console.log('server started at http://localhost:8080');
});
