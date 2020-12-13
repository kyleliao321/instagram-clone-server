import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts_table', (table: Knex.TableBuilder) => {
    table.uuid('post_id').primary();
    table.string('description');
    table.string('location');
    table.timestamp('created_on');
    table.string('image_src').notNullable();
    table.uuid('posted_user').references('user_ud').inTable('users_table');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('posts_table');
}
