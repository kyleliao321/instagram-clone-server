import Knex from 'knex';
import { UserRelationsTable } from '../constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    UserRelationsTable.name,
    (table: Knex.TableBuilder) => {
      table.uuid(UserRelationsTable.columns.followerId).notNullable();
      table.uuid(UserRelationsTable.columns.followingId).notNullable();
      table.primary([
        UserRelationsTable.columns.followerId,
        UserRelationsTable.columns.followingId
      ]);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(UserRelationsTable.name);
}
