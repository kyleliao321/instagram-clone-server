/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Domain Model  //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

import { Request } from 'express';

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

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Services ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type AddNewAccount = (newAccountInfo: NewAccountInfo) => Promise<string>;

export type AddNewUserProfile = (
  NewUserProfileInfo: NewUserProfileInfo
) => Promise<string>;

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Controller //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type Controller = (httpRequest: Request) => Promise<HttpResponse>;

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

export type AccountRepository = {
  insertNewAccount: (newAccount: NewAccount) => Promise<string>;
};

export type UserRepository = {
  insertNewUserProfile: (newUserProfile: NewUserProfile) => Promise<string>;
};

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  HTTP Response /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export type HttpResponse = {
  headers: {
    'Content-Type': string;
  };
  status: number;
};
