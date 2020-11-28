import * as Joi from 'joi';

export const RegisterRequestSchema = Joi.object().keys({
  userName: Joi.string().min(1).required(), // cannot be blank
  password: Joi.string().min(1).required() // cannot be blank
});

export const LoginRequestSchema = Joi.object().keys({
  userName: Joi.string().min(1).required(),
  password: Joi.string().min(1).required()
});

export const GetUserProfileRequestSchema = Joi.object().keys({
  userId: Joi.string().min(1).required()
});
