import request from 'supertest';
import app from '../';
import db from '../infrastructure/database';

describe('user-post-relations-api-test', () => {
  let firstLoginUserId: string;
  let firstLoginUserToken: string;

  let secondLoginUserId: string;
  let secondLoginUserToken: string;

  const validPostId = 'a727ccd6-bd17-4eaf-a1c7-b14993589c37';

  beforeAll(async () => {
    await db.migrate.latest();
    await db.seed.run();

    const firstRes = await request(app)
      .post('/api/v1/accounts/login')
      .set('Accept', 'application/json')
      .send({ userName: 'user_name_1', password: 'hashed_password_1' });

    firstLoginUserId = firstRes.body.userId;
    firstLoginUserToken = firstRes.body.jwt;

    const secondRes = await request(app)
      .post('/api/v1/accounts/login')
      .set('Accept', 'application/json')
      .send({ userName: 'user_name_2', password: 'hashed_password_2' });

    secondLoginUserId = secondRes.body.userId;
    secondLoginUserToken = secondRes.body.jwt;
  });

  afterAll(async () => {
    return db.migrate.rollback().then(() => db.destroy());
  });

  afterEach(async () => {
    return await db('user_post_relations_table').del();
  });

  test('POST /api/v1/likes/ - succeed', async () => {
    // given
    const userId = firstLoginUserId;
    const postId = validPostId;

    const reqBody = {
      userId,
      postId
    };

    // when
    const res = await request(app)
      .post('/api/v1/likes/')
      .set('Authorization', `Bearer ${firstLoginUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    const keys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(201);
    expect(keys.length).toBe(1);
    expect(keys.includes('likedUsers')).toBe(true);
    expect(res.body.likedUsers.length).toBe(1);
  });

  test('POST /api/v1/likes/ - incorrect request body format - without userId', async () => {
    // given
    const postId = validPostId;

    const reqBody = {
      postId
    };

    // when
    const res = await request(app)
      .post('/api/v1/likes/')
      .set('Authorization', `Bearer ${firstLoginUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    // expect
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/likes/ - incorrect request body format - without postId', async () => {
    // given
    const userId = firstLoginUserId;

    const reqBody = {
      userId
    };

    // when
    const res = await request(app)
      .post('/api/v1/likes/')
      .set('Authorization', `Bearer ${firstLoginUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    // expect
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/likes/ - incorrect request body format - empty body', async () => {
    // given
    const reqBody = {};

    // when
    const res = await request(app)
      .post('/api/v1/likes/')
      .set('Authorization', `Bearer ${firstLoginUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    // expect
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/likes/ - forbidden access', async () => {
    // given
    const userId = firstLoginUserId;
    const postId = validPostId;

    const reqBody = {
      userId,
      postId
    };

    // when
    const res = await request(app)
      .post('/api/v1/likes/')
      .set('Authorization', `Bearer ${secondLoginUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    // expect
    expect(res.status).toBe(403);
  });

  test('POST /api/v1/likes/ - request without authorization header', async () => {
    // given
    const userId = firstLoginUserId;
    const postId = validPostId;

    const reqBody = {
      userId,
      postId
    };

    // when
    const res = await request(app)
      .post('/api/v1/likes/')
      .set('Accept', 'application/json')
      .send(reqBody);

    // expect
    expect(res.status).toBe(401);
  });

  test('DELETE /api/v1/likes/ - succeed', async () => {
    // given
    const userId = secondLoginUserId;
    const postId = validPostId;

    // when
    const res = await request(app)
      .delete(`/api/v1/likes/user/${userId}/post/${postId}`)
      .set('Authorization', `Bearer ${secondLoginUserToken}`)
      .set('Accept', 'application/json');

    const keys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(200);
    expect(keys.length).toBe(1);
    expect(keys.includes('likedUsers')).toBe(true);
    expect(res.body.likedUsers.length).toBe(0);
  });

  test('DELETE /api/v1/likes/ - forbidden access', async () => {
    // given
    const userId = secondLoginUserId;
    const postId = validPostId;

    // when
    const res = await request(app)
      .delete(`/api/v1/likes/user/${userId}/post/${postId}`)
      .set('Authorization', `Bearer ${firstLoginUserToken}`)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(403);
  });

  test('DELETE /api/v1/likes/ - request without authorization header', async () => {
    // given
    const userId = secondLoginUserId;
    const postId = validPostId;

    // when
    const res = await request(app)
      .delete(`/api/v1/likes/user/${userId}/post/${postId}`)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(401);
  });

  test('GET /api/v1/likes/ filter by postId - succeed', async () => {
    // given
    const userId = firstLoginUserId;
    const postId = validPostId;

    const queryBody = {
      postId
    };

    const insertReqBody = {
      userId,
      postId
    };

    // when
    await request(app)
      .post('/api/v1/likes/')
      .set('Authorization', `Bearer ${firstLoginUserToken}`)
      .set('Accept', 'application/json')
      .send(insertReqBody);

    const queryRes = await request(app)
      .get('/api/v1/likes/')
      .query(queryBody)
      .set('Accept', 'application/json');

    const queryBodyKeys = Object.keys(queryRes.body);

    // expect
    expect(queryRes.status).toBe(200);
    expect(queryBodyKeys.length).toBe(1);
    expect(queryBodyKeys.includes('likedUsers')).toBe(true);
    expect(queryRes.body.likedUsers.length).toBe(1);
  });

  test('GET /api/v1/likes/ - incorrect request query format', async () => {
    // given
    const queryBody = {};

    // when
    const res = await request(app)
      .get('/api/v1/likes/')
      .query(queryBody)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(400);
  });
});
