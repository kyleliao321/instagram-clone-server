import Knex from 'knex';
import { UnauthorizedError } from '../../utilities/http-error';
import { AccountDao, LoginAccount, NewAccount } from '../../utilities/types';

export default function makeBuildAccountDao(dependencies: { db: Knex }) {
  return function buildAccountDao(): AccountDao {
    return Object.freeze({
      insert,
      verify
    });

    async function insert(newAccount: NewAccount): Promise<string> {
      await dependencies.db('accounts_table').insert({
        user_id: newAccount.getId(),
        user_name: newAccount.getUserName(),
        hashed_password: newAccount.getHashedPassword()
      });

      return newAccount.getId();
    }

    async function verify(loginAccount: LoginAccount): Promise<string> {
      const result = await dependencies
        .db('accounts_table')
        .select('user_id')
        .where('user_name', loginAccount.getUserName())
        .andWhere('hashed_password', loginAccount.getHashedPassword())
        .first();

      if (result) {
        return result.user_id;
      }

      throw new UnauthorizedError('User Account does not exist');
    }
  };
}
