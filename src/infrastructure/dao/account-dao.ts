import { accountDao, LoginAccount, NewAccount } from '../../utilities/types';

export default function makeBuildAccountDao() {
  return function buildAccountDao(): accountDao {
    return Object.freeze({
      insert,
      verify
    });

    async function insert(newAccount: NewAccount): Promise<string> {
      throw new Error('Not yet implemented.');
    }

    async function verify(loginAccount: LoginAccount): Promise<string> {
      throw new Error('Not yet implemented.');
    }
  };
}
