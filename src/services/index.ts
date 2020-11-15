import makeAddNewAccount from './account/add-new-account';
import makeAddNewUserProfile from './user/add-new-user-profile';
import makeVerifyAccount from './account/verify-account';
import makeGenerateToken from './account/generate-token';
import { accountRepository, userRepository } from '../infrastructure';
import {
  buildNewAccount,
  buildNewUserProfile,
  buildLoginAccount
} from '../models';

const addNewAccount = makeAddNewAccount({ buildNewAccount, accountRepository });

const verifyAccount = makeVerifyAccount({
  buildLoginAccount,
  accountRepository
});

const addNewUserProfile = makeAddNewUserProfile({
  buildNewUserProfile,
  userRepository
});

const generateToken = makeGenerateToken({
  key: 'privateKey'
});

export { addNewAccount, verifyAccount, addNewUserProfile, generateToken };