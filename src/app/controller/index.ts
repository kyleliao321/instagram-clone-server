import {
  addNewAccountService,
  updateAccountService,
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
  getFollowingListService,
  addNewPostService,
  getPostService,
  getPostListService,
  likePostService,
  dislikePostService,
  getLikedUserListService
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
import makeAddNewPost from './post/add-new-post';
import makeGetPost from './post/get-post';
import makeGetPosts from './post/get-posts';
import makeLikePost from './like/like-post';
import makeDislikePost from './like/dislike-post';
import makeGetLikedUsers from './like/get-liked-users';

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
  updateUserProfileService,
  updateAccountService
});

const followUser = makeFollowUser({
  verifyTokenService,
  followUserService,
  getUserProfileByIdService,
  updateUserProfileService
});

const cancelFollowing = makeCancelFollowing({
  verifyTokenService,
  cancelFollowingService,
  getUserProfileByIdService,
  updateUserProfileService
});

const getFollowers = makeGetFollowers({ getFollowerListService });

const getFollowings = makeGetFollowings({ getFollowingListService });

const addNewPost = makeAddNewPost({ verifyTokenService, addNewPostService });

const getPost = makeGetPost({ getPostService });

const getPosts = makeGetPosts({ getPostListService });

const likePost = makeLikePost({
  verifyTokenService,
  likePostService
});

const dislikePost = makeDislikePost({
  verifyTokenService,
  dislikePostService
});

const getLikedUsers = makeGetLikedUsers({ getLikedUserListService });

export {
  register,
  login,
  getUserProfile,
  searchUserProfiles,
  updateUserProfile,
  followUser,
  cancelFollowing,
  getFollowers,
  getFollowings,
  addNewPost,
  getPost,
  getPosts,
  likePost,
  dislikePost,
  getLikedUsers
};
