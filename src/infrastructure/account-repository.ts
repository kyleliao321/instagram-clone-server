import { AccountRepository, NewAccount, Account } from '../utilities/types';
import { logger } from '../infrastructure';

export default function buildMakeAccountRepository() {
  const accountTable = new Map<string, Account>();

  return function makeAccountRepository(): AccountRepository {
    return Object.freeze({
      insertNewAccount
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
  };
}
