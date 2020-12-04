import {
  addNewAccountService,
  addNewUserProfileService,
  getUserProfileByIdService,
  getUserProfileListService,
  updateUserProfileService,
  verifyAccountService,
  generateTokenService,
  verifyTokenService,
  followUserService
} from '../services';
import makeRegister from './account/register';
import makeLogin from './account/login';
import makeGetUserProfile from './user/get-user-profile';
import makeUpdateUserProfile from './user/update-user-profile';
import makeSearchUserProfiles from './user/search-user-profiles';
import makeFollowUser from './relation/follow-user';

const register = makeRegister({
  addNewAccountService,
  addNewUserProfileService
});

const login = makeLogin({ generateTokenService, verifyAccountService });

const getUserProfile = makeGetUserProfile({ getUserProfileByIdService });

const searchUserProfiles = makeSearchUserProfiles({
  getUserProfileListService
});

const updateUserProfile = makeUpdateUserProfile({
  verifyTokenService,
  updateUserProfileService
});

const followUser = makeFollowUser({
  verifyTokenService,
  followUserService
});

export {
  register,
  login,
  getUserProfile,
  searchUserProfiles,
  updateUserProfile,
  followUser
};
