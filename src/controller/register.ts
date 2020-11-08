import { Request } from 'express';
import {
  AddNewAccount,
  AddNewUserProfile,
  HttpResponse,
  NewAccountInfo,
  NewUserProfileInfo,
  Controller
} from '../utilities/types';

export default function makeRegister(dependency: {
  addNewAccount: AddNewAccount;
  addNewUserProfile: AddNewUserProfile;
}): Controller {
  return async function register(httpRequest: Request): Promise<HttpResponse> {
    try {
      const data: NewAccountInfo = httpRequest.body;

      const generatedId = await dependency.addNewAccount(data);

      const newUserProfileInfo: NewUserProfileInfo = {
        id: generatedId,
        userName: data.userName
      };

      await dependency.addNewUserProfile(newUserProfileInfo);

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 200
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 500
      };
    }
  };
}
