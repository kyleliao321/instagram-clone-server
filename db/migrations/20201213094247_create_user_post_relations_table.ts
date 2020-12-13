import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    'user_post_relations_table',
    (table: Knex.TableBuilder) => {
      table.uuid('user_id').notNullable();
      table.uuid('post_id').notNullable();
      table.primary(['user_id', 'post_id']);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_post_relations_table');
}
