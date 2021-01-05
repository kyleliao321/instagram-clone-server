import request from 'supertest';
import app from '../';
import db from '../infrastructure/database';

describe('user-relations-api-test', () => {
  let firstUserId: string;
  let firstUserToken: string;

  let secUserId: string;
  let secUserToken: string;

  beforeAll(async () => {
    await db.migrate.latest();
    await db.seed.run();

    const firstRes = await request(app)
      .post('/api/v1/accounts/login')
      .send({ userName: 'user_name_1', password: 'hashed_password_1' })
      .set('Accept', 'application/json');

    firstUserId = firstRes.body.credential.userId;
    firstUserToken = firstRes.body.credential.jwt;

    const secRes = await request(app)
      .post('/api/v1/accounts/login')
      .send({ userName: 'user_name_2', password: 'hashed_password_2' })
      .set('Accept', 'application/json');

    secUserId = secRes.body.credential.userId;
    secUserToken = secRes.body.credential.jwt;
  });

  afterAll(async () => {
    return db.migrate.rollback().then(() => db.destroy());
  });

  afterEach(async () => {
    return await db('user_relations_table').del();
  });

  test('POST /api/v1/relations/ - succeed', async () => {
    // given
    const followerId = firstUserId;
    const followingId = secUserId;

    const reqBody = {
      followerId,
      followingId
    };

    // when
    const res = await request(app)
      .post('/api/v1/relations/')
      .set('Authorization', `Bearer ${firstUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    const keys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(201);
    expect(keys.length).toBe(1);
    expect(keys.includes('followings')).toBe(true);
    expect(res.body.followings.length).toBe(1);
  });

  test('POST /api/v1/relations/ - incorrect request body format - without followingId', async () => {
    // given
    const followerId = firstUserId;

    const reqBody = {
      followerId
    };

    // when
    const res = await request(app)
      .post('/api/v1/relations/')
      .set('Authorization', `Bearer ${firstUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    // expect
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/relations/ - incorrect request body format - without followerId', async () => {
    // given
    const followingId = secUserId;

    const reqBody = {
      followingId
    };

    // when
    const res = await request(app)
      .post('/api/v1/relations/')
      .set('Authorization', `Bearer ${firstUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    // expect
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/relations/ - incorrect request body format - emtpy body', async () => {
    // given
    const reqBody = {};

    // when
    const res = await request(app)
      .post('/api/v1/relations/')
      .set('Authorization', `Bearer ${firstUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    // expect
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/relations/ - duplicated relations', async () => {
    // given
    const followerId = firstUserId;
    const followingId = secUserId;

    const reqBody = {
      followerId,
      followingId
    };

    // when
    const res = await request(app)
      .post('/api/v1/relations/')
      .set('Authorization', `Bearer ${firstUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    const duplicatedRes = await request(app)
      .post('/api/v1/relations/')
      .set('Authorization', `Bearer ${firstUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    const resKeys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(201);
    expect(resKeys.length).toBe(1);
    expect(resKeys.includes('followings')).toBe(true);
    expect(res.body.followings.length).toBe(1);

    expect(duplicatedRes.status).toBe(500);
  });

  test('POST /api/v1/relations/ - unauthorized request', async () => {
    // given
    const followerId = firstUserId;
    const followingId = secUserId;

    const reqBody = {
      followerId,
      followingId
    };

    // when
    const res = await request(app)
      .post('/api/v1/relations/')
      .set('Accept', 'application/json')
      .send(reqBody);

    // expect
    expect(res.status).toBe(401);
  });

  test('POST /api/v1/relations/ - incorrect authorized header', async () => {
    // given
    const followerId = firstUserId;
    const followingId = secUserId;

    const reqBody = {
      followerId,
      followingId
    };

    // when
    const res = await request(app)
      .post('/api/v1/relations/')
      .set('Authorization', `Bearer ${secUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    // expect
    expect(res.status).toBe(403);
  });

  test('DELETE /api/v1/relations/follower/:followerId/following/:followingId - succeed', async () => {
    // given
    const followerId = firstUserId;
    const followingId = secUserId;

    const reqBody = {
      followerId,
      followingId
    };

    // when
    const createdRes = await request(app)
      .post('/api/v1/relations/')
      .set('Authorization', `Bearer ${firstUserToken}`)
      .set('Accept', 'application/json')
      .send(reqBody);

    const deletedRes = await request(app)
      .delete(
        `/api/v1/relations/follower/${followerId}/following/${followingId}`
      )
      .set('Authorization', `Bearer ${firstUserToken}`)
      .set('Accept', 'application/json');

    // expect
    expect(createdRes.status).toBe(201);
    expect(deletedRes.status).toBe(200);
  });

  test('DELETE /api/v1/relations/ - relation does not exist', async () => {
    // given
    const followerId = firstUserId;
    const followingId = secUserId;

    // when
    const res = await request(app)
      .delete(
        `/api/v1/relations/follower/${followerId}/following/${followingId}`
      )
      .set('Authorization', `Bearer ${firstUserToken}`)
      .set('Accept', 'application/json');

    const keys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(200);
    expect(keys.length).toBe(1);
    expect(keys.includes('followings')).toBe(true);
    expect(res.body.followings.length).toBe(0);
  });

  test('GET /api/v1/relations/followers/:userId - succeed', async () => {
    // given
    const followerId = firstUserId;
    const followingId = secUserId;

    const insertReqBody = {
      followerId,
      followingId
    };

    // when
    const createdRes = await request(app)
      .post('/api/v1/relations/')
      .set('Authorization', `Bearer ${firstUserToken}`)
      .set('Accept', 'application/json')
      .send(insertReqBody);

    const queryRes = await request(app)
      .get(`/api/v1/relations/followers/${followingId}`)
      .set('Accept', 'application/json');

    const queryBodyKeys = Object.keys(queryRes.body);

    // expect
    expect(createdRes.status).toBe(201);
    expect(queryRes.status).toBe(200);
    expect(queryBodyKeys.length).toBe(1);
    expect(queryBodyKeys.includes('followers')).toBe(true);
    expect(queryRes.body.followers.length).toBe(1);
  });

  test('GET /api/v1/relations/followings - succeed', async () => {
    // given
    const followerId = firstUserId;
    const followingId = secUserId;

    const insertReqBody = {
      followerId,
      followingId
    };

    // when
    const createdRes = await request(app)
      .post('/api/v1/relations/')
      .set('Authorization', `Bearer ${firstUserToken}`)
      .set('Accept', 'application/json')
      .send(insertReqBody);

    const queryRes = await request(app)
      .get(`/api/v1/relations/followings/${followerId}`)
      .set('Accept', 'application/json');

    const queryBodyKeys = Object.keys(queryRes.body);

    // expect
    expect(createdRes.status).toBe(201);
    expect(queryRes.status).toBe(200);
    expect(queryBodyKeys.length).toBe(1);
    expect(queryBodyKeys.includes('followings')).toBe(true);
    expect(queryRes.body.followings.length).toBe(1);
  });
});
