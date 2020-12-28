import makeBuildNewAccount from './account/new-account';
import makeBuildUpdatedAccount from './account/updated-account';
import makeBuildLoginAccount from './account/login-account';
import makeBuildNewUserProfile from './user/uploaded-user-profile';
import makeBuildQueryUserProfile from './user/query-user-profile';
import makeBuildUpdatedUserProfile from './user/updated-user-profile';
import makeBuildNewPost from './post/new-post';
import makeBuildQueryPost from './post/query-post';
import { idHandler, hashHandler, imageHandler } from '../infrastructure';

const buildNewAccount = makeBuildNewAccount({ idHandler, hashHandler });

const buildUpdatedAccount = makeBuildUpdatedAccount({ hashHandler });

const buildNewUserProfile = makeBuildNewUserProfile({
  idHandler,
  imageHandler
});

const buildLoginAccount = makeBuildLoginAccount({ hashHandler });

const buildQueryUserProfile = makeBuildQueryUserProfile({
  idHandler,
  imageHandler
});

const buildUpdatedUserProfile = makeBuildUpdatedUserProfile({
  idHandler,
  imageHandler
});

const buildNewPost = makeBuildNewPost({
  postIdHandler: idHandler,
  userIdHandler: idHandler,
  imageHandler
});

const buildQueryPost = makeBuildQueryPost({
  postIdHandler: idHandler,
  userIdHandler: idHandler,
  imageHandler
});

export {
  buildNewAccount,
  buildUpdatedAccount,
  buildNewUserProfile,
  buildLoginAccount,
  buildQueryUserProfile,
  buildUpdatedUserProfile,
  buildNewPost,
  buildQueryPost
};
