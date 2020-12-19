import Knex from 'knex';
import { AccountsTable } from '../constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    AccountsTable.name,
    (table: Knex.TableBuilder) => {
      table.uuid(AccountsTable.columns.userId).primary();
      table.string(AccountsTable.columns.userName, 250).notNullable().unique();
      table.string(AccountsTable.columns.hashedPassword, 250).notNullable();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(AccountsTable.name);
}
