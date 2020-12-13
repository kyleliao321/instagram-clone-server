import {
  AccountsTable,
  PostsTable,
  UserPostRelationsTable,
  UserRelationsTable,
  UsersTable
} from '../constants';
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
    const result = await db.schema.hasTable(UsersTable.name);

    // expect
    expect(result).toBe(true);
  });

  test('accounts_table should exist', async () => {
    // when
    const result = await db.schema.hasTable(AccountsTable.name);

    // expect
    expect(result).toBe(true);
  });

  test('posts_table should exist', async () => {
    // when
    const result = await db.schema.hasTable(PostsTable.name);

    // expect
    expect(result).toBe(true);
  });

  test('user_relations_table should exist', async () => {
    // when
    const result = await db.schema.hasTable(UserRelationsTable.name);

    // expect
    expect(result).toBe(true);
  });

  test('user_post_relations_table should exist', async () => {
    // when
    const result = await db.schema.hasTable(UserPostRelationsTable.name);

    // expect
    expect(result).toBe(true);
  });

  test('users_table should have correct structure', async () => {
    expect(
      await db.schema.hasColumn(UsersTable.name, UsersTable.columns.userId)
    ).toBe(true);
    expect(
      await db.schema.hasColumn(UsersTable.name, UsersTable.columns.userName)
    ).toBe(true);
    expect(
      await db.schema.hasColumn(UsersTable.name, UsersTable.columns.description)
    ).toBe(true);
    expect(
      await db.schema.hasColumn(UsersTable.name, UsersTable.columns.imageSrc)
    ).toBe(true);
    expect(
      await db.schema.hasColumn(UsersTable.name, UsersTable.columns.postNum)
    ).toBe(true);
    expect(
      await db.schema.hasColumn(UsersTable.name, UsersTable.columns.followerNum)
    ).toBe(true);
    expect(
      await db.schema.hasColumn(
        UsersTable.name,
        UsersTable.columns.followingNum
      )
    ).toBe(true);
  });

  test('accounts_table should have correct structure', async () => {
    expect(
      await db.schema.hasColumn(
        AccountsTable.name,
        AccountsTable.columns.userId
      )
    ).toBe(true);
    expect(
      await db.schema.hasColumn(
        AccountsTable.name,
        AccountsTable.columns.userName
      )
    ).toBe(true);
    expect(
      await db.schema.hasColumn(
        AccountsTable.name,
        AccountsTable.columns.hashedPassword
      )
    ).toBe(true);
  });

  test('posts_table should have correct structure', async () => {
    expect(
      await db.schema.hasColumn(PostsTable.name, PostsTable.columns.postId)
    ).toBe(true);
    expect(
      await db.schema.hasColumn(PostsTable.name, PostsTable.columns.description)
    ).toBe(true);
    expect(
      await db.schema.hasColumn(PostsTable.name, PostsTable.columns.location)
    ).toBe(true);
    expect(
      await db.schema.hasColumn(PostsTable.name, PostsTable.columns.createdAt)
    ).toBe(true);
    expect(
      await db.schema.hasColumn(PostsTable.name, PostsTable.columns.imageSrc)
    ).toBe(true);
    expect(
      await db.schema.hasColumn(PostsTable.name, PostsTable.columns.postedUser)
    ).toBe(true);
  });

  test('user_relations_table should have correct structure', async () => {
    expect(
      await db.schema.hasColumn(
        UserRelationsTable.name,
        UserRelationsTable.columns.followerId
      )
    ).toBe(true);
    expect(
      await db.schema.hasColumn(
        UserRelationsTable.name,
        UserRelationsTable.columns.followingId
      )
    ).toBe(true);
  });

  test('user_post_relations_table should have correct structure', async () => {
    expect(
      await db.schema.hasColumn(
        UserPostRelationsTable.name,
        UserPostRelationsTable.columns.userId
      )
    ).toBe(true);
    expect(
      await db.schema.hasColumn(
        UserPostRelationsTable.name,
        UserPostRelationsTable.columns.postId
      )
    ).toBe(true);
  });
});
