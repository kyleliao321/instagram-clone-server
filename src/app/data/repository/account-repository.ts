import {
  AccountRepository,
  NewAccount,
  LoginAccount,
  AccountDao,
  UpdatedAccount
} from '../../utilities/types';

export default function makeBuildAccountRepository(dependencies: {
  accountDao: AccountDao;
}) {
  return function buildAccountRepository(): AccountRepository {
    return Object.freeze({
      insertNewAccount,
      verifyLoginAccount,
      updateAccount
    });

    async function insertNewAccount(newAccount: NewAccount): Promise<string> {
      return await dependencies.accountDao.insert(newAccount);
    }

    async function verifyLoginAccount(
      loginAccount: LoginAccount
    ): Promise<string> {
      return await dependencies.accountDao.verify(loginAccount);
    }

    async function updateAccount(
      updatedAccount: UpdatedAccount
    ): Promise<string> {
      throw new Error('Not yet implemented');
    }
  };
}
