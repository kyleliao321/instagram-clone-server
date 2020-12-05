import * as Joi from 'joi';

export const RegisterRequestBodySchema = Joi.object().keys({
  userName: Joi.string().min(1).required(), // cannot be blank
  password: Joi.string().min(1).required() // cannot be blank
});

export const LoginRequestBodySchema = Joi.object().keys({
  userName: Joi.string().min(1).required(),
  password: Joi.string().min(1).required()
});

export const GetUserProfileRequestBodySchema = Joi.object().keys({
  userId: Joi.string().min(1).required()
});

export const GetUserProfileRequestParamsSchema = Joi.object().keys({
  userId: Joi.string().required()
});

export const SearchUserProfilesRequestQuerySchema = Joi.object().keys({
  userName: Joi.string().required()
});

export const UpdateUserProfileRequestBodySchema = Joi.object().keys({
  id: Joi.string().min(1).required(),
  userName: Joi.string().min(1).required(),
  alias: Joi.string().min(1).required(),
  description: Joi.string().required().allow(''), // allow to be blank
  encodedImage: Joi.string(), // allow to be undefined
  postNum: Joi.number().min(0),
  followerNum: Joi.number().min(0),
  followingNum: Joi.number().min(0)
});

export const UpdateUserProfileRequestParamsSchema = Joi.object().keys({
  userId: Joi.string().required()
});

export const FollowUserBodySchema = Joi.object().keys({
  followerId: Joi.string().required(),
  followingId: Joi.string().required()
});

export const CancelFollowingBodySchema = Joi.object().keys({
  followerId: Joi.string().required(),
  followingId: Joi.string().required()
});

export const GetFollowersBodySchema = Joi.object().keys({
  userId: Joi.string().required()
});

export const GetFollowingsBodySchema = Joi.object().keys({
  userId: Joi.string().required()
});

export const AddNewPostBodySchema = Joi.object().keys({
  description: Joi.string().allow(''),
  location: Joi.string(),
  timestamp: Joi.string().required(),
  encodedImage: Joi.string().required(),
  postedUserId: Joi.string().required()
});

export const GetPostBodySchema = Joi.object().keys({
  postId: Joi.string().required()
});

export const GetPostParamsSchema = Joi.object().keys({
  postId: Joi.string().required()
});

export const GetPostsBodySchema = Joi.object().keys({
  userId: Joi.string().required()
});

export const LikePostBodySchema = Joi.object().keys({
  userId: Joi.string().required(),
  postId: Joi.string().required()
});
