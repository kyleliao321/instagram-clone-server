import {
  AccountRepository,
  BuildUpdatedAccount,
  UpdateAccountService,
  UpdateAccountServiceInfo
} from '../../utilities/types';

export default function makeUpdateAccountService(dependencies: {
  buildUpdatedAccount: BuildUpdatedAccount;
  accountRepository: AccountRepository;
}): UpdateAccountService {
  return async function updateAccountService(
    info: UpdateAccountServiceInfo
  ): Promise<string> {
    const updatedAccount = dependencies.buildUpdatedAccount(info);

    return await dependencies.accountRepository.updateAccount(updatedAccount);
  };
}
