import {
  AccountRepository,
  NewAccount,
  LoginAccount,
  accountDao
} from '../../utilities/types';

export default function makeBuildAccountRepository(dependencies: {
  accountDao: accountDao;
}) {
  return function buildAccountRepository(): AccountRepository {
    return Object.freeze({
      insertNewAccount,
      verifyLoginAccount
    });

    async function insertNewAccount(newAccount: NewAccount): Promise<string> {
      return await dependencies.accountDao.insert(newAccount);
    }

    async function verifyLoginAccount(
      loginAccount: LoginAccount
    ): Promise<string> {
      return await dependencies.accountDao.verify(loginAccount);
    }
  };
}
