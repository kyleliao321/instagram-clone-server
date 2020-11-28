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

export const UpdateUserProfileRequestSchema = Joi.object().keys({
  id: Joi.string().min(1).required(),
  userName: Joi.string().min(1).required(),
  alias: Joi.string().min(1).required(),
  description: Joi.string().required().allow(''), // allow to be blank
  encodedImage: Joi.string(), // allow to be undefined
  postNum: Joi.number().min(0),
  followerNum: Joi.number().min(0),
  followingNum: Joi.number().min(0)
});
