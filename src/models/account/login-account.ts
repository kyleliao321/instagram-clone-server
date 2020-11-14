import {
  BuildLoginAccount,
  HashHandler,
  LoginAccountInfo,
  LoginAccount
} from '../../utilities/types';

export default function makeBuildLoginAccount(dependency: {
  hashHandler: HashHandler;
}): BuildLoginAccount {
  return function buildLoginAccount(
    loginAccountInfo: LoginAccountInfo
  ): LoginAccount {
    const hashedPassword = dependency.hashHandler.hash(
      loginAccountInfo.password
    );

    return Object.freeze({
      getUserName: () => loginAccountInfo.userName,
      getHashedPassword: () => hashedPassword
    });
  };
}
