import { AccountRepository, NewAccount } from '../utilities/types';

export default function makeAccountRepository(): AccountRepository {
  async function insertNewAccount(newAccount: NewAccount): Promise<string> {
    return newAccount.getId();
  }

  return Object.freeze({
    insertNewAccount
  });
}
