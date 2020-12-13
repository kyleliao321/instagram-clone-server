import Knex from 'knex';
import { UserPostRelationsTable } from '../constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    UserPostRelationsTable.name,
    (table: Knex.TableBuilder) => {
      table.uuid(UserPostRelationsTable.columns.userId).notNullable();
      table.uuid(UserPostRelationsTable.columns.postId).notNullable();
      table.primary([
        UserPostRelationsTable.columns.userId,
        UserPostRelationsTable.columns.postId
      ]);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(UserPostRelationsTable.name);
}
