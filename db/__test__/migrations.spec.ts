import db from '../index';

describe('migration', () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    return db.migrate.rollback().then(() => db.destroy());
  });

  test('users_table should exist', async () => {
    // when
    const result = await db.schema.hasTable('users_table');

    // expect
    expect(result).toBe(true);
  });

  test('accounts_table should exist', async () => {
    // when
    const result = await db.schema.hasTable('accounts_table');

    // expect
    expect(result).toBe(true);
  });

  test('posts_table should exist', async () => {
    // when
    const result = await db.schema.hasTable('posts_table');

    // expect
    expect(result).toBe(true);
  });

  test('user_relations_table should exist', async () => {
    // when
    const result = await db.schema.hasTable('user_relations_table');

    // expect
    expect(result).toBe(true);
  });

  test('user_post_relations_table should exist', async () => {
    // when
    const result = await db.schema.hasTable('user_post_relations_table');

    // expect
    expect(result).toBe(true);
  });
});
