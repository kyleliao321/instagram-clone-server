import makeAddNewAccount from './account/add-new-account';
import makeAddNewUserProfile from './user/add-new-user-profile';
import makeUpdateUserProfile from './user/update-user-profile';
import makeGetUserProfileById from './user/get-user-profile-by-id';
import makeVerifyAccount from './account/verify-account';
import makeGenerateToken from './account/generate-token';
import { accountRepository, userRepository } from '../infrastructure';
import {
  buildNewAccount,
  buildNewUserProfile,
  buildLoginAccount,
  buildQueryUserProfile
} from '../models';

const addNewAccount = makeAddNewAccount({ buildNewAccount, accountRepository });

const verifyAccount = makeVerifyAccount({
  buildLoginAccount,
  accountRepository
});

const addNewUserProfile = makeAddNewUserProfile({
  buildNewUserProfile,
  userRepository
});

const getUserProfileById = makeGetUserProfileById({
  buildQueryUserProfile,
  userRepository
});

const updateUserProfile = makeUpdateUserProfile({
  buildNewUserProfile,
  userRepository
});

const generateToken = makeGenerateToken({
  key: 'privateKey'
});

export {
  addNewAccount,
  verifyAccount,
  addNewUserProfile,
  getUserProfileById,
  updateUserProfile,
  generateToken
};
