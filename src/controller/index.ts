import {
  addNewAccountService,
  addNewUserProfileService,
  getUserProfileByIdService,
  updateUserProfileService,
  verifyAccountService,
  generateTokenService
} from '../services';
import makeRegister from './account/register';
import makeLogin from './account/login';
import makeGetUserProfile from './user/get-user-profile';
import makeUpdateUserProfile from './user/update-user-profile';

const register = makeRegister({
  addNewAccountService,
  addNewUserProfileService
});

const login = makeLogin({ generateTokenService, verifyAccountService });

const getUserProfile = makeGetUserProfile({ getUserProfileByIdService });

const updateUserProfile = makeUpdateUserProfile({ updateUserProfileService });

export { register, login, getUserProfile, updateUserProfile };
