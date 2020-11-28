import { Request } from 'express';

/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Domain Model  //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type NewAccountInfo = {
  userName: string;
  password: string;
};

export type BuildNewAccount = (newAccountInfo: NewAccountInfo) => NewAccount;

export type NewAccount = {
  getId: () => string;
  getUserName: () => string;
  getHashedPassword: () => string;
};

export type NewUserProfileInfo = {
  id: string;
  userName: string;
  alias?: string;
  description?: string;
  imageByteArray?: Int8Array;
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

export type LoginAccountInfo = {
  userName: string;
  password: string;
};

export type LoginAccount = {
  getUserName: () => string;
  getHashedPassword: () => string;
};

export type BuildLoginAccount = (
  loginAccountInfo: LoginAccountInfo
) => LoginAccount;

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
  updatedUserProfileInfo: NewUserProfileInfo
) => Promise<string>;

export type VerifyAccountService = (
  loginAccountInfo: LoginAccountInfo
) => Promise<string>;

export type GenerateTokenService = (id: string) => string;

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Controller //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type Controller<T> = (httpRequest: Request) => Promise<HttpResponse<T>>;

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
  updateUserProfile: (updatedUserProfile: NewUserProfile) => Promise<string>;
};

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  HTTP Response /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type RegisterResponseBody = null;

export type LoginResponseBody = {
  jwt: string;
};

export type HttpResponse<T> = {
  headers: {
    'Content-Type': string;
  };
  status: number;
  body?: T;
};
