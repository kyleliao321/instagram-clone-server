import Knex from 'knex';
import { PostsTable, UsersTable } from '../constants';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    PostsTable.name,
    (table: Knex.TableBuilder) => {
      table.uuid(PostsTable.columns.postId).primary();
      table.string(PostsTable.columns.description);
      table.string(PostsTable.columns.location);
      table.timestamp(PostsTable.columns.createdAt);
      table.string(PostsTable.columns.imageSrc).notNullable();
      table
        .uuid(PostsTable.columns.postedUser)
        .references(UsersTable.columns.userId)
        .inTable(UsersTable.name);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(PostsTable.name);
}
