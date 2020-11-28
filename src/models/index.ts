import makeBuildNewAccount from './account/new-account';
import makeBuildLoginAccount from './account/login-account';
import makeBuildNewUserProfile from './user/uploaded-user-profile';
import makeBuildQueryUserProfile from './user/query-user-profile';
import makeBuildUpdatedUserProfile from './user/updated-user-profile';
import { idHandler, hashHandler, imageHandler } from '../infrastructure';

const buildNewAccount = makeBuildNewAccount({ idHandler, hashHandler });

const buildNewUserProfile = makeBuildNewUserProfile({ idHandler });

const buildLoginAccount = makeBuildLoginAccount({ hashHandler });

const buildQueryUserProfile = makeBuildQueryUserProfile({
  idHandler,
  imageHandler
});

const buildUpdatedUserProfile = makeBuildUpdatedUserProfile({ idHandler });

export {
  buildNewAccount,
  buildNewUserProfile,
  buildLoginAccount,
  buildQueryUserProfile,
  buildUpdatedUserProfile
};
