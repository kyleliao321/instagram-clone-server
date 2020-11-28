import {
  addNewAccountService,
  addNewUserProfileService,
  getUserProfileByIdService,
  updateUserProfileService,
  verifyAccountService,
  generateTokenService
} from '../services';
import makeRegister from './register';
import makeLogin from './login';
import makeGetUserProfile from './get-user-profile';
import makeUpdateUserProfile from './update-user-profile';

const register = makeRegister({
  addNewAccountService,
  addNewUserProfileService
});

const login = makeLogin({ generateTokenService, verifyAccountService });

const getUserProfile = makeGetUserProfile({ getUserProfileByIdService });

const updateUserProfile = makeUpdateUserProfile({ updateUserProfileService });

export { register, login, getUserProfile, updateUserProfile };
