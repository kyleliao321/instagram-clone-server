import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import { logger } from '../../infrastructure';
import { RequestKeys } from '../constants';
import { BadRequestError } from '../http-error';

export default function makeValidateRequest(dependencies: {
  schema: Schema;
  key: RequestKeys;
}) {
  return function validateRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (req[dependencies.key] === undefined) {
      logger.error(
        `Exception occurs while validate request.${dependencies.key} ${req.method} ${req.originalUrl}:
         request does not have property - ${dependencies.key}`
      );
      res.sendStatus(BadRequestError.STATUS_CODE);
      return;
    }

    const { error } = dependencies.schema.validate(req[dependencies.key]);

    if (error) {
      logger.error(
        `Exception occurs while validate request.${dependencies.key} ${req.method} ${req.originalUrl}:
        ${error.stack}`
      );
      res.sendStatus(BadRequestError.STATUS_CODE);
    } else {
      next();
    }
  };
}
