import { Controller } from './types';
import { Request, Response } from 'express';
import { logger } from '../infrastructure';

export default function makeRouteCallback(controller: Controller) {
  return function routeCallback(req: Request, res: Response): void {
    controller(req)
      .then((httpResponse) => {
        logger.info(httpResponse);
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type('json');
        res.status(httpResponse.status).send(httpResponse.body);
      })
      .catch((e) => {
        logger.error(e);
        res.status(500).send('Unknow error occurred.');
      });
  };
}
