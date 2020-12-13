import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    'user_relations_table',
    (table: Knex.TableBuilder) => {
      table.uuid('follower_id').notNullable();
      table.uuid('following_id').notNullable();
      table.primary(['follower_id', 'following_id']);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_relations_table');
}
