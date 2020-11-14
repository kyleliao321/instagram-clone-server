import {
  BuildLoginAccount,
  VerifyAccount,
  LoginAccountInfo,
  AccountRepository
} from '../../utilities/types';

export default function makeVerifyAccount(dependency: {
  buildLoginAccount: BuildLoginAccount;
  accountRepository: AccountRepository;
}): VerifyAccount {
  return async function verifyAccount(
    loginAccountInfo: LoginAccountInfo
  ): Promise<string> {
    const loginAccount = dependency.buildLoginAccount(loginAccountInfo);

    return dependency.accountRepository.verifyLoginAccount(loginAccount);
  };
}
