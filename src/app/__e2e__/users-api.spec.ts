import request from 'supertest';
import app from '../';
import db from '../../app/infrastructure/database';

describe('users-api-test', () => {
  let loginUserId: string;
  let loginUserToken: string;

  beforeAll(async () => {
    await db.migrate.latest();
    await db.seed.run();

    const res = await request(app)
      .post('/api/v1/accounts/login')
      .send({ userName: 'user_name_1', password: 'hashed_password_1' })
      .set('Accept', 'application/json');

    loginUserId = res.body.userId;
    loginUserToken = res.body.jwt;
  });

  afterAll(async () => {
    return db.migrate.rollback().then(() => db.destroy());
  });

  test('GET /api/v1/users/:userId - succeed', async () => {
    // given
    const url = `/api/v1/users/${loginUserId}`;

    // when
    const res = await request(app).get(url).set('Accept', 'application/json');

    const keys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(200);
    expect(keys.length).toBe(8);
    expect(keys.includes('id')).toBe(true);
    expect(keys.includes('userName')).toBe(true);
    expect(keys.includes('alias')).toBe(true);
    expect(keys.includes('description')).toBe(true);
    expect(keys.includes('imageSrc')).toBe(true);
    expect(keys.includes('postNum')).toBe(true);
    expect(keys.includes('followerNum')).toBe(true);
    expect(keys.includes('followingNum')).toBe(true);
  });

  test('GET /api/v1/users/:userId - user does not exist', async () => {
    // given
    const mockId = 'a7254a46-e26e-4577-82a0-1bbd35cb6831';

    const url = `/api/v1/users/${mockId}`;

    // when
    const res = await request(app).get(url).set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(404);
  });

  test('GET /api/v1/users/ - filter by user name succeed', async () => {
    // given
    const reqQuery = {
      userName: 'user'
    };

    // when
    const res = await request(app)
      .get('/api/v1/users/')
      .query(reqQuery)
      .set('Accept', 'application/json');

    const keys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(200);
    expect(keys.length).toBe(1);
    expect(keys.includes('users')).toBe(true);
    expect(res.body.users.length).toBe(2);
  });

  test('GET /api/v1/users/ - request without correct query format', async () => {
    // when
    const res = await request(app)
      .get('/api/v1/users/')
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(400);
  });

  test('PUT /api/v1/users/:userId - succeed', async () => {
    // given
    const reqBody = {
      id: loginUserId,
      userName: 'newUserName',
      alias: 'newAlias',
      description: 'newDes',
      postNum: 1,
      followerNum: 1,
      followingNum: 1
    };

    const url = `/api/v1/users/${loginUserId}`;

    // when
    const res = await request(app)
      .put(url)
      .set('Authorization', `Bearer ${loginUserToken}`)
      .send(reqBody)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(200);
  });

  test('PUT /api/v1/users/:userId - incorrect request body format', async () => {
    // given
    const reqBody = {};

    const url = `/api/v1/users/${loginUserId}`;

    // when
    const res = await request(app)
      .put(url)
      .set('Authorization', `Bearer ${loginUserToken}`)
      .send(reqBody)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(400);
  });
});
