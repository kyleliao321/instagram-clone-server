import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users_table', (table: Knex.TableBuilder) => {
    table.uuid('user_id').primary();
    table.string('user_name', 250).notNullable().unique();
    table.string('alias', 250).notNullable();
    table.string('description', 250);
    table.string('image_src', 250);
    table.integer('post_num').notNullable().defaultTo(0);
    table.integer('follower_num').notNullable().defaultTo(0);
    table.integer('following_num').notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users_table');
}
