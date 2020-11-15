import {
  BuildLoginAccount,
  VerifyAccountService,
  LoginAccountInfo,
  AccountRepository
} from '../../utilities/types';

export default function makeVerifyAccount(dependency: {
  buildLoginAccount: BuildLoginAccount;
  accountRepository: AccountRepository;
}): VerifyAccountService {
  return async function verifyAccount(
    loginAccountInfo: LoginAccountInfo
  ): Promise<string> {
    const loginAccount = dependency.buildLoginAccount(loginAccountInfo);

    return dependency.accountRepository.verifyLoginAccount(loginAccount);
  };
}
