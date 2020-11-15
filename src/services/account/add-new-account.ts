import {
  AccountRepository,
  AddNewAccountService,
  BuildNewAccount,
  NewAccountInfo
} from '../../utilities/types';

export default function makeAddNewAccount(dependency: {
  buildNewAccount: BuildNewAccount;
  accountRepository: AccountRepository;
}): AddNewAccountService {
  return async function addNewAccount(
    newAccountInfo: NewAccountInfo
  ): Promise<string> {
    const newAccount = dependency.buildNewAccount(newAccountInfo);

    return dependency.accountRepository.insertNewAccount(newAccount);
  };
}
