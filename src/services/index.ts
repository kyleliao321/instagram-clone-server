import makeAddNewAccountService from './account/add-new-account';
import makeAddNewUserProfileService from './user/add-new-user-profile';
import makeUpdateUserProfileService from './user/update-user-profile';
import makeGetUserProfileByIdService from './user/get-user-profile-by-id';
import makeVerifyAccountService from './account/verify-account';
import makeGenerateTokenService from './account/generate-token';
import { accountRepository, userRepository } from '../infrastructure';
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

const updateUserProfileService = makeUpdateUserProfileService({
  buildUpdatedUserProfile,
  userRepository
});

const generateTokenService = makeGenerateTokenService({
  key: 'privateKey'
});

export {
  addNewAccountService,
  verifyAccountService,
  addNewUserProfileService,
  getUserProfileByIdService,
  updateUserProfileService,
  generateTokenService
};
