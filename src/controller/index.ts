import {
  addNewAccountService,
  addNewUserProfileService,
  getUserProfileByIdService,
  getUserProfileListService,
  updateUserProfileService,
  verifyAccountService,
  generateTokenService,
  verifyTokenService,
  followUserService,
  cancelFollowingService,
  getFollowerListService,
  getFollowingListService
} from '../services';
import makeRegister from './account/register';
import makeLogin from './account/login';
import makeGetUserProfile from './user/get-user-profile';
import makeUpdateUserProfile from './user/update-user-profile';
import makeSearchUserProfiles from './user/search-user-profiles';
import makeFollowUser from './relation/follow-user';
import makeCancelFollowing from './relation/cancel-following';
import makeGetFollowers from './relation/get-followers';
import makeGetFollowings from './relation/get-followings';

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

const cancelFollowing = makeCancelFollowing({
  verifyTokenService,
  cancelFollowingService
});

const getFollowers = makeGetFollowers({ getFollowerListService });

const getFollowings = makeGetFollowings({ getFollowingListService });

export {
  register,
  login,
  getUserProfile,
  searchUserProfiles,
  updateUserProfile,
  followUser,
  cancelFollowing,
  getFollowers,
  getFollowings
};
