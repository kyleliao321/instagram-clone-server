import Knex from 'knex';
import { ConflictError, UnauthorizedError } from '../../utilities/http-error';
import {
  AccountDao,
  LoginAccount,
  NewAccount,
  UpdatedAccount
} from '../../utilities/types';

export default function makeBuildAccountDao(dependencies: { db: Knex }) {
  return function buildAccountDao(): AccountDao {
    return Object.freeze({
      insert,
      update,
      verify
    });

    async function insert(newAccount: NewAccount): Promise<string> {
      try {
        await dependencies.db('accounts_table').insert({
          user_id: newAccount.getId(),
          user_name: newAccount.getUserName(),
          hashed_password: newAccount.getHashedPassword()
        });
        return newAccount.getId();
      } catch (e) {
        if (e instanceof Error && e.message.includes('duplicate key value')) {
          throw new ConflictError('username is already existed.');
        }
        throw e;
      }
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

    async function update(updatedAccount: UpdatedAccount): Promise<string> {
      const result = await dependencies
        .db('accounts_table')
        .where('user_id', updatedAccount.getId())
        .update({
          user_name: updatedAccount.getUserName(),
          hashed_password: updatedAccount.getHashedPassword()
        })
        .returning('user_id');

      if (result.length === 1) {
        return result[0];
      }

      throw new UnauthorizedError('User Account does not exist');
    }
  };
}
