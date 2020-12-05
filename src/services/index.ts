import makeAddNewAccountService from './account/add-new-account';
import makeAddNewUserProfileService from './user/add-new-user-profile';
import makeUpdateUserProfileService from './user/update-user-profile';
import makeGetUserProfileByIdService from './user/get-user-profile-by-id';
import makeGetUserProfileListService from './user/get-user-profile-list';
import makeVerifyAccountService from './account/verify-account';
import makeGenerateTokenService from './account/generate-token';
import makeVerifyTokenService from './account/verify-token';
import makeFollowUserService from './relation/follow-user-service';
import makeCancelFollowingService from './relation/cancel-following-service';
import makeGetFollowerListService from './relation/get-follower-list-service';
import makeGetFollowingListService from './relation/get-following-list-service';
import makeAddNewPostService from './post/add-new-post-service';
import {
  accountRepository,
  userRepository,
  relationRepository,
  postRepository,
  authHandler
} from '../infrastructure';
import {
  buildNewAccount,
  buildNewUserProfile,
  buildLoginAccount,
  buildQueryUserProfile,
  buildUpdatedUserProfile,
  buildNewPost,
  buildQueryPost
} from '../models';

const addNewAccountService = makeAddNewAccountService({
  buildNewAccount,
  accountRepository
});

const verifyAccountService = makeVerifyAccountService({
  buildLoginAccount,
  accountRepository
});

const addNewUserProfileService = makeAddNewUserProfileService({
  buildNewUserProfile,
  userRepository
});

const getUserProfileByIdService = makeGetUserProfileByIdService({
  buildQueryUserProfile,
  userRepository
});

const getUserProfileListService = makeGetUserProfileListService({
  buildQueryUserProfile,
  userRepository
});

const updateUserProfileService = makeUpdateUserProfileService({
  buildUpdatedUserProfile,
  userRepository
});

const generateTokenService = makeGenerateTokenService({
  authHandler,
  key: 'privateKey'
});

const verifyTokenService = makeVerifyTokenService({
  authHandler,
  key: 'privateKey'
});

const followUserService = makeFollowUserService({
  buildQueryUserProfile,
  relationRepository
});

const cancelFollowingService = makeCancelFollowingService({
  buildQueryUserProfile,
  relationRepository
});

const getFollowerListService = makeGetFollowerListService({
  buildQueryUserProfile,
  relationRepository
});

const getFollowingListService = makeGetFollowingListService({
  buildQueryUserProfile,
  relationRepository
});

const addNewPostService = makeAddNewPostService({
  buildNewPost,
  buildQueryPost,
  postRepository
});

export {
  addNewAccountService,
  verifyAccountService,
  addNewUserProfileService,
  getUserProfileByIdService,
  getUserProfileListService,
  updateUserProfileService,
  generateTokenService,
  verifyTokenService,
  followUserService,
  cancelFollowingService,
  getFollowerListService,
  getFollowingListService,
  addNewPostService
};
