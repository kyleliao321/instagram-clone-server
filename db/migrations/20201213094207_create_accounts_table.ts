import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    'accounts_table',
    (table: Knex.TableBuilder) => {
      table.uuid('user_id').primary();
      table.string('user_name', 250).notNullable().unique();
      table.string('hashed_password', 250).notNullable();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('accounts_table');
}
