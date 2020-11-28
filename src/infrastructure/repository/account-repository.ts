import { AuthenticationError } from '../../utilities/http-error';
import {
  AccountRepository,
  NewAccount,
  LoginAccount,
  Account
} from '../../utilities/types';

export default function makeBuildAccountRepository() {
  const accountTable = new Map<string, Account>();

  return function buildAccountRepository(): AccountRepository {
    return Object.freeze({
      insertNewAccount,
      verifyLoginAccount
    });

    async function insertNewAccount(newAccount: NewAccount): Promise<string> {
      const id = newAccount.getId();

      if (accountTable.has(id)) {
        throw new Error('Account ID has already been in database.');
      }

      accountTable.set(id, {
        id: newAccount.getId(),
        userName: newAccount.getUserName(),
        hashedPassword: newAccount.getHashedPassword()
      });

      return id;
    }

    async function verifyLoginAccount(
      loginAccount: LoginAccount
    ): Promise<string> {
      let result: string | null = null;

      accountTable.forEach((v, k, m) => {
        if (v.userName === loginAccount.getUserName()) {
          if (v.hashedPassword === loginAccount.getHashedPassword()) {
            result = v.id;
          }
        }
      });

      if (result === null) {
        throw new AuthenticationError();
      }

      return result;
    }
  };
}
