import {
  BuildLoginAccount,
  VerifyAccountService,
  LoginAccountInfo,
  AccountRepository
} from '../../utilities/types';

export default function makeVerifyAccountService(dependency: {
  buildLoginAccount: BuildLoginAccount;
  accountRepository: AccountRepository;
}): VerifyAccountService {
  return async function verifyAccountService(
    loginAccountInfo: LoginAccountInfo
  ): Promise<string> {
    const loginAccount = dependency.buildLoginAccount(loginAccountInfo);

    return dependency.accountRepository.verifyLoginAccount(loginAccount);
  };
}
