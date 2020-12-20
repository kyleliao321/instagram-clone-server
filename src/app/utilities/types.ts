import { Request } from 'express';
import { SignOptions, VerifyOptions } from 'jsonwebtoken';

/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Domain Model  //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type BuildNewAccount = (newAccountInfo: NewAccountInfo) => NewAccount;

export type NewAccount = {
  getId: () => string;
  getUserName: () => string;
  getHashedPassword: () => string;
};

export type BuildNewUserProfile = (
  newUserProfileInfo: NewUserProfileInfo
) => NewUserProfile;

export type NewUserProfile = {
  getId: () => string;
  getUserName: () => string;
  getAlias: () => string;
  getDescription: () => string | null;
  getEncodedImage: () => string | null;
  getImageSrc: () => Promise<string | null>;
};

export type LoginAccount = {
  getUserName: () => string;
  getHashedPassword: () => string;
};

export type BuildLoginAccount = (
  loginAccountInfo: LoginAccountInfo
) => LoginAccount;

export type QueryUserProfile = {
  getId: () => string;
  getUserName: () => string;
  getAlias: () => string;
  getDescription: () => string;
  getImageSrc: () => string | null;
  getPostNum: () => number;
  getFollowerNum: () => number;
  getFollowingNum: () => number;
};

export type BuildQueryUserProfile = (
  fetchedUserProfileInfo: QueryUserProfileInfo
) => QueryUserProfile;

export type UpdatedUserProfile = {
  getId: () => string;
  getUserName: () => string;
  getAlias: () => string;
  getDescription: () => string;
  getEncodedImage: () => string | null;
  getPostNum: () => number;
  getFollowerNum: () => number;
  getFollowingNum: () => number;
  getImageSrc: () => Promise<string | null>;
};

export type BuildUpdatedUserProfile = (
  updateUserProfileInfo: UpdatedUserProfileInfo
) => UpdatedUserProfile;

export type NewPost = {
  getId: () => string;
  getDescription: () => string;
  getLocation: () => string | null;
  getTimeStamp: () => string;
  getEncodedImage: () => string;
  getPostedUserId: () => string;
  getImageSrc: () => Promise<string>;
};

export type BuildNewPost = (newPostInfo: NewPostInfo) => NewPost;

export type QueryPost = {
  getId: () => string;
  getDescription: () => string;
  getLocation: () => string | null;
  getTimeStamp: () => string;
  getImageSrc: () => string;
  getPostedUserId: () => string;
};

export type BuildQueryPost = (queryPostInfo: Post) => QueryPost;

/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////  Data Model  ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type Account = {
  id: string;
  userName: string;
  hashedPassword: string;
};

export type UserProfile = {
  id: string;
  userName: string;
  alias: string;
  description: string;
  imageSrc?: string;
  postNum: number;
  followerNum: number;
  followingNum: number;
};

export type Post = {
  id: string;
  description: string;
  location?: string;
  timestamp: string;
  imageSrc: string;
  postedUserId: string;
};

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Services ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type AddNewAccountService = (
  newAccountInfo: NewAccountInfo
) => Promise<string>;

export type AddNewUserProfileService = (
  NewUserProfileInfo: NewUserProfileInfo
) => Promise<string>;

export type UpdateUserProfileService = (
  updatedUserProfileInfo: UpdatedUserProfileInfo
) => Promise<string>;

export type GetUserProfileService = (
  userId: string
) => Promise<QueryUserProfile>;

export type GetUserProfileListService = (
  userName: string
) => Promise<QueryUserProfile[]>;

export type VerifyAccountService = (
  loginAccountInfo: LoginAccountInfo
) => Promise<string>;

export type GenerateTokenService = (id: string) => string;

export type VerifyTokenService = (bearerHeader?: string) => string;

export type FollowUserService = (
  followUserInfo: FollowUserServiceInfo
) => Promise<QueryUserProfile[]>;

export type CacnelFollowingService = (
  cancelFollowingInfo: CacnelFollowingServiceInfo
) => Promise<QueryUserProfile[]>;

export type GetFollowerListService = (
  userId: string
) => Promise<QueryUserProfile[]>;

export type GetFollowingListService = (
  userId: string
) => Promise<QueryUserProfile[]>;

export type AddNewPostService = (
  newPostInfo: NewPostInfo
) => Promise<QueryPost>;

export type GetPostService = (postId: string) => Promise<QueryPost>;

export type GetPostListService = (userId: string) => Promise<QueryPost[]>;

export type LikePostService = (
  likePostServiceInfo: LikePostServiceInfo
) => Promise<QueryUserProfile[]>;

export type DislikePostService = (
  disLikePostServiceInfo: DislikePostServiceInfo
) => Promise<QueryUserProfile[]>;

export type GetLikedUserListService = (
  postId: string
) => Promise<QueryUserProfile[]>;

/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Services info ////////////////////////.////////////
/////////////////////////////////////////////////////////////////////////////////////

export type LoginAccountInfo = {
  userName: string;
  password: string;
};

export type QueryUserProfileInfo = {
  id: string;
  userName: string;
  alias: string;
  description: string;
  imageSrc?: string;
  postNum: number;
  followerNum: number;
  followingNum: number;
};

export type NewUserProfileInfo = {
  id: string;
  userName: string;
  alias?: string;
  description?: string;
  encodedImage?: string;
};

export type NewAccountInfo = {
  userName: string;
  password: string;
};

export type UpdatedUserProfileInfo = {
  id: string;
  userName: string;
  alias: string;
  description: string;
  encodedImage?: string;
  postNum: number;
  followerNum: number;
  followingNum: number;
};

export type FollowUserServiceInfo = {
  followerId: string;
  followingId: string;
};

export type CacnelFollowingServiceInfo = {
  followerId: string;
  followingId: string;
};

export type NewPostInfo = {
  description?: string;
  timestamp: string;
  location?: string;
  encodedImage: string;
  postedUserId: string;
};

export type LikePostServiceInfo = {
  userId: string;
  postId: string;
};

export type DislikePostServiceInfo = {
  userId: string;
  postId: string;
};

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Controller //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type GenericController = (
  httpRequest: Request
) => Promise<GenericHttpResponse>;

export type Controller<R extends GenericHttpResponse> = (
  httpRequest: Request
) => Promise<R>;

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  infrastructure ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type IdHandler = {
  getId: () => string;
  isValid: (id: string) => boolean;
};

export type HashHandler = {
  hash: (input: string) => string;
};

export type ImageHandler = {
  isValid: (filName: string) => boolean;
  exports: (encodedImage: string) => Promise<string>;
};

export type AuthHandler = {
  sign: (
    payload: Record<string, unknown>,
    key: string,
    options?: SignOptions
  ) => string;
  verify: (
    token: string,
    key: string,
    options?: VerifyOptions
  ) => string | unknown;
};

export type QueryHandler = {
  getQuery: (name: string) => string;
};

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////  Repositories /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type AccountRepository = {
  insertNewAccount: (newAccount: NewAccount) => Promise<string>;
  verifyLoginAccount: (loginAccount: LoginAccount) => Promise<string>;
};

export type UserRepository = {
  insertNewUserProfile: (newUserProfile: NewUserProfile) => Promise<string>;
  updateUserProfile: (
    updatedUserProfile: UpdatedUserProfile
  ) => Promise<string>;
  getUserProfile: (userId: string) => Promise<UserProfile>;
  filterUserProfilesByUserName: (userName: string) => Promise<UserProfile[]>;
};

export type RelationRepository = {
  getFollowers: (userId: string) => Promise<UserProfile[]>;
  getFollowings: (userId: string) => Promise<UserProfile[]>;
  followUser: (
    followerId: string,
    followingId: string
  ) => Promise<UserProfile[]>;
  cancelFollowing: (
    followerId: string,
    followingId: string
  ) => Promise<UserProfile[]>;
};

export type PostRepository = {
  getPost: (postId: string) => Promise<Post>;
  getPosts: (userId: string) => Promise<Post[]>;
  insertNewPost: (newPost: NewPost) => Promise<Post>;
};

export type LikeSystemRepository = {
  getLikedUsers: (postId: string) => Promise<UserProfile[]>;
  likePost: (userId: string, postId: string) => Promise<UserProfile[]>;
  dislikePost: (userId: string, postId: string) => Promise<UserProfile[]>;
};

/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// DAOs ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type UserDao = {
  insert: (newUserProfile: NewUserProfile) => Promise<string>;
  update: (updatedUserProfile: UpdatedUserProfile) => Promise<string>;
  getOne: (userId: string) => Promise<UserProfile>;
  filter: (userName: string) => Promise<UserProfile[]>;
};

export type AccountDao = {
  insert: (newAccount: NewAccount) => Promise<string>;
  verify: (loginAccount: LoginAccount) => Promise<string>;
};

export type RelationDao = {
  filterByFollowingId: (followingId: string) => Promise<UserProfile[]>;
  filterByFollowerId: (followerId: string) => Promise<UserProfile[]>;
  insert: (followerId: string, followingId: string) => Promise<UserProfile[]>;
  remove: (followerId: string, followingId: string) => Promise<UserProfile[]>;
};

export type PostDao = {
  insert: (newPost: NewPost) => Promise<Post>;
  getOne: (postId: string) => Promise<Post>;
  filterByPostedUserId: (userId: string) => Promise<Post[]>;
};

export type LikeSystemDao = {
  insert: (userId: string, postId: string) => Promise<UserProfile[]>;
  remove: (userId: string, postId: string) => Promise<UserProfile[]>;
  filterByPostId: (postId: string) => Promise<UserProfile[]>;
};

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  HTTP Response /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type RegisterResponseBody = null;

export type UpdateUserProfileResponseBody = {
  userId: string;
};

export type LoginResponseBody = {
  jwt: string;
  userId: string;
};

export type GetUserProfileReponseBody = {
  id: string;
  userName: string;
  alias: string;
  description: string;
  imageSrc: string | null;
  postNum: number;
  followerNum: number;
  followingNum: number;
};

export type SearchUserProfilesResponseBody = {
  users: GetUserProfileReponseBody[];
};

export type FollowUserResponseBody = {
  followings: GetUserProfileReponseBody[];
};

export type CancelFollowingResponseBody = {
  followings: GetUserProfileReponseBody[];
};

export type GetFollowersResponseBody = {
  followers: GetUserProfileReponseBody[];
};

export type GetFollowingsResponseBody = {
  followings: GetUserProfileReponseBody[];
};

export type AddNewPostResponseBody = {
  id: string;
  description: string;
  location: string | null;
  timestamp: string;
  imageSrc: string;
  postedUserId: string;
};

export type GetPostResponseBody = AddNewPostResponseBody;

export type GetPostsResponseBody = {
  posts: GetPostResponseBody[];
};

export type LikePostResponseBody = {
  likedUsers: GetUserProfileReponseBody[];
};

export type DislikePostResponseBody = {
  likedUsers: GetUserProfileReponseBody[];
};

export type GetLikedUsersResponseBody = {
  likedUsers: GetUserProfileReponseBody[];
};

export type GenericHttpResponse = {
  headers: {
    'Content-Type': string;
  };
  status: number;
  body?: unknown;
};

export interface HttpResponse<T> extends GenericHttpResponse {
  headers: {
    'Content-Type': string;
  };
  status: number;
  body?: T;
}

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  HTTP Request /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type GetUserProfileRequestBody = {
  userId: string;
};

export type LoginRequestBody = LoginAccountInfo;

export type RegisterRequestBody = NewAccountInfo;

export type UpdateUserProfileRequestBody = UpdatedUserProfileInfo;

export type FollowUserRequestBody = FollowUserServiceInfo;

export type CancelFollowingRequestBody = CacnelFollowingServiceInfo;

export type GetFollowersRequestBody = {
  userId: string;
};

export type GetFollowingsRequestBody = {
  userId: string;
};

export type AddNewPostRequestBody = NewPostInfo;

export type GetPostRequestBody = {
  postId: string;
};

export type GetPostsRequestBody = {
  userId: string;
};

export type LikePostRequestBody = {
  userId: string;
  postId: string;
};

export type DislikePostRequestBody = {
  userId: string;
  postId: string;
};
