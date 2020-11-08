import makeAddNewAccount from './account/add-new-account';
import makeAddNewUserProfile from './user/add-new-user-profile';
import { accountRepository, userRepository } from '../infrastructure';
import { buildNewAccount, buildNewUserProfile } from '../models';

const addNewAccount = makeAddNewAccount({ buildNewAccount, accountRepository });

const addNewUserProfile = makeAddNewUserProfile({ buildNewUserProfile, userRepository });

export {
    addNewAccount,
    addNewUserProfile
}