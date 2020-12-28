import {
  BuildUpdatedAccount,
  HashHandler,
  UpdateAccountServiceInfo,
  UpdatedAccount
} from '../../utilities/types';

export default function makeBuildUpdatedAccount(dependencies: {
  hashHandler: HashHandler;
}): BuildUpdatedAccount {
  return function buildUpdatedAccount(
    updatedAccountInfo: UpdateAccountServiceInfo
  ): UpdatedAccount {
    const hashedPassword =
      updatedAccountInfo.password === undefined
        ? undefined
        : dependencies.hashHandler.hash(updatedAccountInfo.password);

    return Object.freeze({
      getId: () => updatedAccountInfo.id,
      getUserName: () => updatedAccountInfo.userName,
      getHashedPassword: () => hashedPassword
    });
  };
}
