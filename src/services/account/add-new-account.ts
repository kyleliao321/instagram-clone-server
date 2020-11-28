import {
  AccountRepository,
  AddNewAccountService,
  BuildNewAccount,
  NewAccountInfo
} from '../../utilities/types';

export default function makeAddNewAccountService(dependency: {
  buildNewAccount: BuildNewAccount;
  accountRepository: AccountRepository;
}): AddNewAccountService {
  return async function addNewAccountService(
    newAccountInfo: NewAccountInfo
  ): Promise<string> {
    const newAccount = dependency.buildNewAccount(newAccountInfo);

    return dependency.accountRepository.insertNewAccount(newAccount);
  };
}
