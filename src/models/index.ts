import makeBuildNewAccount from './account/new-account';
import makeBuildNewUserProfile from './user/uploaded-user-profile';
import { idHandler, hashHandler } from '../infrastructure';

const buildNewAccount = makeBuildNewAccount({ idHandler, hashHandler });

const buildNewUserProfile = makeBuildNewUserProfile({ idHandler });

export {
    buildNewAccount,
    buildNewUserProfile
}