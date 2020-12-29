import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import { logger } from '../../infrastructure';
import { RequestKeys } from '../constants';
import { BadRequestError } from '../http-error';

export default function makeValidateRequest(dependency: {
  schema: Schema;
  key: RequestKeys;
}) {
  return function validateRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { error } = dependency.schema.validate(req[dependency.key]);

    if (error) {
      logger.error(
        `Exception occurs while validate request format ${req.method} ${req.originalUrl}:
        ${error.stack}`
      );
      res.sendStatus(BadRequestError.STATUS_CODE);
    } else {
      next();
    }
  };
}
