import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export default function makeValidateRequest(dependency: {
    schema: Schema
}) {
    return function validateRequest(req: Request, res: Response, next: NextFunction): void {

        const { error } = dependency.schema.validate(req.body);

        if (error) {
            console.log(`schema ${dependency.schema} validation failed: ${error}`);
            res.sendStatus(500);
            res.send('Invalid request');
        } else {
            console.log(`schema ${dependency.schema} validation succeed`);
            next();
        }   
    }
}