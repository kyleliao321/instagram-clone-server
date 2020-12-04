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
import {
  accountRepository,
  userRepository,
  relationRepository,
  authHandler
} from '../infrastructure';
import {
  buildNewAccount,
  buildNewUserProfile,
  buildLoginAccount,
  buildQueryUserProfile,
  buildUpdatedUserProfile
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
  cancelFollowingService
};
