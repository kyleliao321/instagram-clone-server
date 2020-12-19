import makeBuildLikeSystemDao from './like-system-dao';
import makeBuildPostDao from './post-dao';
import makeBuildUserDao from './user-dao';
import db from '../../../db';
import { NewPost, NewUserProfile } from '../../utilities/types';

describe('like-system-dao', () => {
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

  const posts = [
    {
      postId: 'b97239ac-56e3-4426-98c2-00e610ce6a15',
      location: 'location',
      timestamp: '1999-01-07T20:05:06.000Z',
      description: 'description',
      imageSrc: 'imageSrc',
      postedUserId: '1229d5f3-3e5a-4a21-a2ed-f3149833222c'
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

    const newPosts: NewPost[] = posts.map((p) => {
      return {
        getId: jest.fn(() => p.postId),
        getLocation: jest.fn(() => p.location),
        getDescription: jest.fn(() => p.description),
        getTimeStamp: jest.fn(() => p.timestamp),
        getEncodedImage: jest.fn(() => p.imageSrc),
        getPostedUserId: jest.fn(() => p.postedUserId)
      };
    });

    const buildUserDao = makeBuildUserDao({ db });
    const buildPostDao = makeBuildPostDao({ db });

    const userDao = buildUserDao();
    const postDao = buildPostDao();

    for (let userProfile of newUserProfiles) {
      await userDao.insert(userProfile);
    }

    for (let post of newPosts) {
      await postDao.insert(post);
    }
  });

  afterAll(async () => {
    await db('posts_table').del();
    await db('users_table').del();
    return db.migrate.rollback().then(() => db.destroy());
  });

  afterEach(async () => {
    return db('user_post_relations_table').del();
  });

  test('should return correct result when insertion is done successfully', async () => {
    // given
    const userId = users[0].userId;
    const postId = posts[0].postId;

    const buildLikeSystemDao = makeBuildLikeSystemDao({ db });

    const likeSystemDao = buildLikeSystemDao();

    // when
    const result = await likeSystemDao.insert(userId, postId);

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

  test('should return correct result when remove is done successfully', async () => {
    // given
    const firstUserId = users[0].userId;
    const secUserId = users[1].userId;
    const postId = posts[0].postId;

    const buildLikeSystemDao = makeBuildLikeSystemDao({ db });

    const likeSystemDao = buildLikeSystemDao();

    // when
    await likeSystemDao.insert(firstUserId, postId);
    await likeSystemDao.insert(secUserId, postId);

    const result = await likeSystemDao.remove(secUserId, postId);

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
});
