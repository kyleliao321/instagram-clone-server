import Knex from 'knex';
import { UsersTable } from '../constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    UsersTable.name,
    (table: Knex.TableBuilder) => {
      table.uuid(UsersTable.columns.userId).primary();
      table.string(UsersTable.columns.userName, 250).notNullable().unique();
      table.string(UsersTable.columns.alias, 250).notNullable();
      table.string(UsersTable.columns.description, 250);
      table.string(UsersTable.columns.imageSrc, 250);
      table.integer(UsersTable.columns.postNum).notNullable().defaultTo(0);
      table.integer(UsersTable.columns.followerNum).notNullable().defaultTo(0);
      table.integer(UsersTable.columns.followingNum).notNullable().defaultTo(0);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(UsersTable.name);
}
