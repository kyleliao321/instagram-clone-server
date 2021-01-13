import db from '../../../../db';
import {
  FeedsDao,
  GetFeedQuery,
  Post,
  UserProfile
} from '../../../utilities/types';
import makeBuildFeedsDao from '../feeds-dao';
import faker from 'faker';

describe('feeds-dao-test', () => {
  /**
   * Testing Scenario:
   *    There are three users in database, and the first user follow other two users.
   *    Each of the followed users has 10 posts.
   */
  let feedsDao: FeedsDao;

  const fakeUsers: UserProfile[] = [
    {
      id: faker.random.uuid(),
      userName: faker.internet.userName() + faker.internet.userName(),
      alias: faker.internet.userName(),
      description: faker.address.country(),
      postNum: 0,
      followerNum: 0,
      followingNum: 2
    },
    {
      id: faker.random.uuid(),
      userName: faker.internet.userName() + faker.internet.userName(),
      alias: faker.internet.userName(),
      description: faker.address.country(),
      postNum: 10,
      followerNum: 1,
      followingNum: 0
    },
    {
      id: faker.random.uuid(),
      userName: faker.internet.userName() + faker.internet.userName(),
      alias: faker.internet.userName(),
      description: faker.address.country(),
      postNum: 10,
      followerNum: 1,
      followingNum: 0
    }
  ];

  const fakePosts: Post[] = [];

  beforeAll(async () => {
    await db.migrate.latest();

    feedsDao = makeBuildFeedsDao({ db })();

    // insert fake user data
    for (let i = 0; i < fakeUsers.length; i++) {
      let fakeUser = fakeUsers[i];
      await db('users_table').insert({
        user_id: fakeUser.id,
        user_name: fakeUser.userName,
        alias: fakeUser.alias,
        description: fakeUser.description,
        post_num: fakeUser.postNum,
        follower_num: fakeUser.followerNum,
        following_num: fakeUser.followingNum
      });
    }

    // generate fake posts
    fakeUsers.forEach((u: UserProfile) => {
      for (let i = 0; i < u.postNum; i++) {
        let fakePost: Post = {
          id: faker.random.uuid(),
          description: faker.address.country(),
          timestamp: faker.date.past().toISOString(),
          imageSrc: 'mockImageSrc.jpg',
          postedUserId: u.id
        };

        fakePosts.push(fakePost);
      }
    });

    // insert fake posts
    for (let i = 0; i < fakePosts.length; i++) {
      let post = fakePosts[i];
      await db('posts_table').insert({
        post_id: post.id,
        location: post.location,
        created_at: post.timestamp,
        image_src: post.imageSrc,
        description: post.description,
        posted_user: post.postedUserId
      });
    }

    // insert fake relations
    await db('user_relations_table').insert([
      { follower_id: fakeUsers[0].id, following_id: fakeUsers[1].id },
      { follower_id: fakeUsers[0].id, following_id: fakeUsers[2].id }
    ]);

    // sort posts order by timestamp desc
    fakePosts.sort(postCompareUtil);
  });

  afterAll(async () => {
    return db.migrate.rollback().then(() => db.destroy());
  });

  // environment setup test
  test('should setup 20 posts in database for two users', async () => {
    const secondUserPosts = await db('posts_table').where(
      'posted_user',
      fakeUsers[1].id
    );
    const thirdUserPosts = await db('posts_table').where(
      'posted_user',
      fakeUsers[2].id
    );

    expect(secondUserPosts.length).toBe(10);
    expect(thirdUserPosts.length).toBe(10);
  });

  test('first user should follow other two user', async () => {
    const relations = await db('user_relations_table');

    expect(relations.length).toBe(2);
  });

  test('fake posts should be sorted by timestamp as desc', () => {
    for (let i = 0; i < fakePosts.length; i++) {
      if (i === 0) {
        continue;
      }

      const preIndex = i - 1;
      const prePost = fakePosts[preIndex];
      const curPost = fakePosts[i];

      // previous post should have timestamp that is after current post
      const preDate = new Date(prePost.timestamp);
      const curDate = new Date(curPost.timestamp);

      expect(preDate >= curDate).toBe(true);
    }
  });

  // actual tests
  test('should return correct result when get latest feeds', async () => {
    // given
    const pageSize = 10;
    const getFeedQuery: GetFeedQuery = {
      userId: jest.fn(() => fakeUsers[0].id),
      before: jest.fn(() => null),
      after: jest.fn(() => null),
      pageSize: jest.fn(() => pageSize)
    };

    // when
    const result = await feedsDao.getLatest(getFeedQuery);

    // expect
    expect(result.length === pageSize).toBe(true);
    result.forEach((f: Post, index: number) => {
      const targetPost = fakePosts[index];
      expect(f.id).toBe(targetPost.id);
      expect(f.description).toBe(targetPost.description);
      expect(f.timestamp).toBe(targetPost.timestamp);
      expect(f.imageSrc).toBe(targetPost.imageSrc);
      expect(f.postedUserId).toBe(targetPost.postedUserId);
    });
  });

  test('should return correct result when get next page and it is full', async () => {
    // given
    const pageSize = 10;
    const firstQuery: GetFeedQuery = {
      userId: jest.fn(() => fakeUsers[0].id),
      before: jest.fn(() => null),
      after: jest.fn(() => null),
      pageSize: jest.fn(() => pageSize)
    };

    const firstResult = await feedsDao.getLatest(firstQuery);

    const secondQuery: GetFeedQuery = {
      userId: jest.fn(() => fakeUsers[0].id),
      before: jest.fn(() => null),
      after: jest.fn(() => firstResult[firstResult.length - 1].timestamp),
      pageSize: jest.fn(() => pageSize)
    };

    // when
    const secondResult = await feedsDao.getNextPage(secondQuery);

    // expect
    expect(secondResult.length === pageSize).toBe(true);
    secondResult.forEach((f: Post, index: number) => {
      const targetPost = fakePosts[index + pageSize];
      expect(f.id).toBe(targetPost.id);
      expect(f.description).toBe(targetPost.description);
      expect(f.timestamp).toBe(targetPost.timestamp);
      expect(f.imageSrc).toBe(targetPost.imageSrc);
      expect(f.postedUserId).toBe(targetPost.postedUserId);
    });
  });

  test('should return correct result when get next page but it is empty', async () => {
    // given
    const pageSize = 20;
    const firstQuery: GetFeedQuery = {
      userId: jest.fn(() => fakeUsers[0].id),
      before: jest.fn(() => null),
      after: jest.fn(() => null),
      pageSize: jest.fn(() => pageSize)
    };

    const firstResult = await feedsDao.getLatest(firstQuery);

    const secondQuery: GetFeedQuery = {
      userId: jest.fn(() => fakeUsers[0].id),
      before: jest.fn(() => null),
      after: jest.fn(() => firstResult[firstResult.length - 1].timestamp),
      pageSize: jest.fn(() => pageSize)
    };

    // when
    const secondResult = await feedsDao.getNextPage(secondQuery);

    // expect
    expect(secondResult.length === 0).toBe(true);
  });

  test('should return correct result when get previous page and it is full', async () => {
    // given
    const pageSize = 5;
    const breakPoint = 16;
    const breakPointPost = fakePosts[breakPoint - 1];
    const secondQuery: GetFeedQuery = {
      userId: jest.fn(() => fakeUsers[0].id),
      before: jest.fn(() => breakPointPost.timestamp),
      after: jest.fn(() => null),
      pageSize: jest.fn(() => pageSize)
    };

    // when
    const result = await feedsDao.getPreviousPage(secondQuery);

    // expect
    expect(result.length === pageSize).toBe(true);
    result.forEach((f: Post, index: number) => {
      const targetPost = fakePosts[breakPoint - pageSize + index - 1];
      expect(f.id).toBe(targetPost.id);
      expect(f.description).toBe(targetPost.description);
      expect(f.timestamp).toBe(targetPost.timestamp);
      expect(f.imageSrc).toBe(targetPost.imageSrc);
      expect(f.postedUserId).toBe(targetPost.postedUserId);
    });
  });

  test('should return correct result when get previous page but it is empty', async () => {
    // given
    const pageSize = 10;
    const firstQuery: GetFeedQuery = {
      userId: jest.fn(() => fakeUsers[0].id),
      before: jest.fn(() => null),
      after: jest.fn(() => null),
      pageSize: jest.fn(() => pageSize)
    };

    const firstResult = await feedsDao.getLatest(firstQuery);

    const secondQuery: GetFeedQuery = {
      userId: jest.fn(() => fakeUsers[0].id),
      before: jest.fn(() => firstResult[0].timestamp),
      after: jest.fn(() => null),
      pageSize: jest.fn(() => pageSize)
    };

    // when
    const secondResult = await feedsDao.getPreviousPage(secondQuery);

    // expect
    expect(secondResult.length === 0).toBe(true);
  });

  function postCompareUtil(p1: Post, p2: Post): number {
    const d1 = new Date(p1.timestamp);
    const d2 = new Date(p2.timestamp);

    if (d1 < d2) {
      return 1;
    } else if (d1 > d2) {
      return -1;
    } else {
      return 0;
    }
  }
});
