import { GenericController, GenericHttpResponse } from '../types';
import { Request, Response } from 'express';
import { logger } from '../../infrastructure';
import { HttpError } from '../http-error';

export default function makeRouteCallback(controller: GenericController) {
  return function routeCallback(req: Request, res: Response): void {
    controller(req)
      .then((httpResponse: GenericHttpResponse) => {
        logger.info(JSON.stringify(httpResponse));
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type('json');
        res.status(httpResponse.status).send(httpResponse.body);
      })
      .catch((e) => {
        logger.error(
          `Exception occurs while processong request ${req.method} ${req.path}:
          ${e.stack}`
        );
        if (e instanceof HttpError) {
          res.statusCode = e.getStatus();
          res.send();
        } else {
          res.statusCode = 500;
          res.send('unknown error');
        }
      });
  };
}
