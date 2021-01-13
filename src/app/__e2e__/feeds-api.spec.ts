import request from 'supertest';
import app from '../../app';
import db from '../../db';
import faker from 'faker';
import { UserProfile, Post } from '../utilities/types';
import { join } from 'path';
import fse from 'fs-extra';

describe('feeds-api-test', () => {
  const imageSrcPath = join(
    process.cwd(),
    '__test__',
    'fixtures',
    'mock-image.jpg'
  );
  const imageDesPath = join(
    process.cwd(),
    'public',
    'images',
    'test',
    'IMG_001.jpg'
  );

  const publicImagesTestDirPath = join(
    process.cwd(),
    'public',
    'images',
    'test'
  );

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
    await fse.copy(imageSrcPath, imageDesPath);

    await db.migrate.latest();

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
          imageSrc: 'IMG_001.jpg',
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
    await fse.remove(publicImagesTestDirPath);
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

  // actual test
  test('GET /api/v1/feeds/ - incorrect request format - missing userId', async () => {
    // given
    const url = '/api/v1/feeds/';
    const query = {
      before: 'mockBefore'
    }; // missing userId

    // when
    const res = await request(app)
      .get(url)
      .query(query)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(400);
  });

  test('GET /api/v1/feeds/ - incorrect request format - two cursoru provided', async () => {
    // given
    const url = '/api/v1/feeds/';
    const query = {
      userId: fakeUsers[0].id,
      before: 'mockBefore',
      after: 'mockAfter'
    };

    // when
    const res = await request(app)
      .get(url)
      .query(query)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(400);
  });

  test('GET /api/v1/feeds/ - incorrect request format - pageSize cannot be parse into integer', async () => {
    // given
    const url = '/api/v1/feeds/';
    const query = {
      userId: fakeUsers[0].id,
      before: 'mockBefore',
      pageSize: 'mockPageSize'
    };

    // when
    const res = await request(app)
      .get(url)
      .query(query)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(400);
  });

  test('GET /api/v1/feeds/ - should get latest feedes when cursors are not provided', async () => {
    // given
    const url = '/api/v1/feeds/';
    const query = {
      userId: fakeUsers[0].id,
      pageSize: '10'
    };

    // when
    const res = await request(app)
      .get(url)
      .query(query)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(200);
    expect('feeds' in res.body).toBe(true);

    const feeds = res.body.feeds;

    expect(feeds.length).toBe(10);
    feeds.forEach((p, index) => {
      const targetPost = fakePosts[index];
      expect(p.id).toBe(targetPost.id);
      expect(p.description).toBe(targetPost.description);
      expect(p.timestamp).toBe(targetPost.timestamp);
      expect(p.imageSrc).toBe(targetPost.imageSrc);
      expect(p.postedUserId).toBe(targetPost.postedUserId);
    });
  });

  test('GET /api/v1/feeds/ - should get next page data when after cursor is provided', async () => {
    // given
    const url = '/api/v1/feeds/';

    const breakPoint = 5;
    const breakPointPost = fakePosts[breakPoint - 1];
    const pageSize = 10;

    const query = {
      userId: fakeUsers[0].id,
      after: breakPointPost.timestamp,
      pageSize: pageSize
    };

    // when
    const res = await request(app)
      .get(url)
      .query(query)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(200);
    expect('feeds' in res.body).toBe(true);

    const feeds = res.body.feeds;

    expect(feeds.length).toBe(10);
    feeds.forEach((p, index) => {
      const targetPost = fakePosts[index + breakPoint];
      expect(p.id).toBe(targetPost.id);
      expect(p.description).toBe(targetPost.description);
      expect(p.timestamp).toBe(targetPost.timestamp);
      expect(p.imageSrc).toBe(targetPost.imageSrc);
      expect(p.postedUserId).toBe(targetPost.postedUserId);
    });
  });

  test('GET /api/v1/feeds/ - should get previous page data when before cursor is provided', async () => {
    // given
    const url = '/api/v1/feeds/';

    const breakPoint = 16;
    const breakPointPost = fakePosts[breakPoint - 1];
    const pageSize = 10;

    const query = {
      userId: fakeUsers[0].id,
      before: breakPointPost.timestamp,
      pageSize: pageSize
    };

    // when
    const res = await request(app)
      .get(url)
      .query(query)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(200);
    expect('feeds' in res.body).toBe(true);

    const feeds = res.body.feeds;

    expect(feeds.length).toBe(10);
    feeds.forEach((p, index) => {
      const targetPost = fakePosts[breakPoint - pageSize + index - 1];
      expect(p.id).toBe(targetPost.id);
      expect(p.description).toBe(targetPost.description);
      expect(p.timestamp).toBe(targetPost.timestamp);
      expect(p.imageSrc).toBe(targetPost.imageSrc);
      expect(p.postedUserId).toBe(targetPost.postedUserId);
    });
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
