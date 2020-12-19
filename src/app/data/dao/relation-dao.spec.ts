import makeBuildRelationDao from './relation-dao';
import makeBuildUserDao from './user-dao';
import { db } from '../../infrastructure';
import { NewUserProfile } from '../../utilities/types';

describe('relation-dao', () => {
  const users = [
    {
      userId: '1229d5f3-3e5a-4a21-a2ed-f3149833222c',
      userName: 'user_name_1',
      alias: 'user_alias_1'
    },
    {
      userId: '7b0f1f1e-8a6b-4d8c-a9e1-eed06e5a437f',
      userName: 'user_name_2',
      alias: 'user_alias_2'
    },
    {
      userId: 'd4352755-8678-4ebf-b885-3e8d2d9c1e74',
      userName: 'user_name_3',
      alias: 'user_alias_3'
    }
  ];

  beforeAll(async () => {
    await db.migrate.latest();

    const newUserProfiles: NewUserProfile[] = users.map((u) => {
      return {
        getId: jest.fn(() => u.userId),
        getUserName: jest.fn(() => u.userName),
        getAlias: jest.fn(() => u.alias),
        getDescription: jest.fn(() => null),
        getEncodedImage: jest.fn(() => null)
      };
    });

    const buildUserDao = makeBuildUserDao({ db });

    const userDao = buildUserDao();

    for (let userProfile of newUserProfiles) {
      await userDao.insert(userProfile);
    }
  });

  afterAll(async () => {
    await db('users_table').del();
    return db.migrate.rollback().then(() => db.destroy());
  });

  afterEach(async () => {
    return db('user_relations_table').del();
  });

  test('should return correct result when insert new user', async () => {
    // given
    const followerId = users[0].userId;
    const followingId = users[1].userId;

    const buildRelationDao = makeBuildRelationDao({ db });

    const relationDao = buildRelationDao();

    // when
    const result = await relationDao.insert(followerId, followingId);

    // expect
    expect(result.length).toBe(1);
    expect(result[0]).toStrictEqual({
      id: users[1].userId,
      userName: users[1].userName,
      alias: users[1].alias,
      description: '',
      imageSrc: undefined,
      postNum: 0,
      followerNum: 0,
      followingNum: 0
    });
  });

  test('should return correct result when get followers list', async () => {
    // given
    const followerId = users[0].userId;
    const followingId = users[1].userId;

    const buildRelationDao = makeBuildRelationDao({ db });

    const relationDao = buildRelationDao();

    // when
    await relationDao.insert(followerId, followingId);

    const result = await relationDao.filterByFollowingId(followingId);

    // expect
    expect(result.length).toBe(1);
    expect(result[0]).toStrictEqual({
      id: users[0].userId,
      userName: users[0].userName,
      alias: users[0].alias,
      description: '',
      imageSrc: undefined,
      postNum: 0,
      followerNum: 0,
      followingNum: 0
    });
  });

  test('should return correct result when given relation is deleted', async () => {
    // given
    const followerId = users[0].userId;
    const firstFollowingId = users[1].userId;
    const secFollowingId = users[2].userId;

    const buildRelationDao = makeBuildRelationDao({ db });

    const relationDao = buildRelationDao();

    // when
    await relationDao.insert(followerId, firstFollowingId);
    await relationDao.insert(followerId, secFollowingId);

    const result = await relationDao.remove(followerId, firstFollowingId);

    // expect
    expect(result.length).toBe(1);
    expect(result[0]).toStrictEqual({
      id: users[2].userId,
      userName: users[2].userName,
      alias: users[2].alias,
      description: '',
      imageSrc: undefined,
      postNum: 0,
      followerNum: 0,
      followingNum: 0
    });
  });
});
