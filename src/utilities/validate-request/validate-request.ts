import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

export default function makeValidateRequest(dependency: { schema: Schema }) {
  return function validateRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { error } = dependency.schema.validate(req.body);

    if (error) {
      res.sendStatus(401);
      res.send('Invalid request');
    } else {
      next();
    }
  };
}
