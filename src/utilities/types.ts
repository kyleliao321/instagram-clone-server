import { Request } from 'express';

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
  getDescription: () => string | undefined;
  getImageByteArray: () => Int8Array | undefined;
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
  getImageByteArray: () => Int8Array | null;
  getPostNum: () => number;
  getFollowerNum: () => number;
  getFollowingNum: () => number;
};

export type BuildUpdatedUserProfile = (
  updateUserProfileInfo: UpdatedUserProfileInfo
) => UpdatedUserProfile;

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

export type VerifyAccountService = (
  loginAccountInfo: LoginAccountInfo
) => Promise<string>;

export type GenerateTokenService = (id: string) => string;

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
  imageSrc: string | null;
  postNum: number;
  followerNum: number;
  followingNum: number;
};

export type NewUserProfileInfo = {
  id: string;
  userName: string;
  alias?: string;
  description?: string;
  imageByteArray?: Int8Array;
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
  imageByteArray?: Int8Array;
  postNum: number;
  followerNum: number;
  followingNum: number;
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
  isValid: (filePath: string | null) => boolean;
};

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
};

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  HTTP Response /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type RegisterResponseBody = null;

export type UpdateUserProfileResponseBody = null;

export type LoginResponseBody = {
  jwt: string;
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
