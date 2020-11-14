import makeBuildNewAccount from './account/new-account';
import makeBuildLoginAccount from './account/login-account';
import makeBuildNewUserProfile from './user/uploaded-user-profile';
import { idHandler, hashHandler } from '../infrastructure';

const buildNewAccount = makeBuildNewAccount({ idHandler, hashHandler });

const buildNewUserProfile = makeBuildNewUserProfile({ idHandler });

const buildLoginAccount = makeBuildLoginAccount({ hashHandler });

export { buildNewAccount, buildNewUserProfile, buildLoginAccount };
