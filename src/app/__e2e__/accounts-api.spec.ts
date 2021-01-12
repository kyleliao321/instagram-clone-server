import app from '..';
import db from '../../db';
import request from 'supertest';

describe('accounts-api-test', () => {
  beforeAll(async () => {
    await db.migrate.latest();
    return await db.seed.run();
  });

  afterAll(async () => {
    return db.migrate.rollback().then(() => db.destroy());
  });

  test('POST /api/v1/accounts/register - Succeed', async () => {
    // given
    const reqBody = {
      userName: 'userName',
      password: 'password'
    };

    // when
    const res = await request(app)
      .post('/api/v1/accounts/register')
      .send(reqBody)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(201);
  });

  test('POST /api/v1/accounts/register - incorrect request format', async () => {
    // given
    const reqBody = {
      userName: 'userName'
    };

    // when
    const res = await request(app)
      .post('/api/v1/accounts/register')
      .send(reqBody)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(400); // Bad Request
  });

  test('POST /api/v1/accounts/register - conflict username', async () => {
    // given
    const reqBody = {
      userName: 'user_name_1',
      password: 'password'
    };

    // when
    const res = await request(app)
      .post('/api/v1/accounts/register')
      .send(reqBody)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(409); // UserName conflict
  });

  test('POST /api/v1/accounts/login - succeed', async () => {
    // given
    const reqBody = {
      userName: 'user_name_1',
      password: 'hashed_password_1'
    };

    // when
    const res = await request(app)
      .post('/api/v1/accounts/login')
      .send(reqBody)
      .set('Accept', 'application/json');

    const keys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(200);
    expect(keys.length).toBe(1);
    expect(keys.includes('credential')).toBe(true);

    const credential = res.body.credential;
    const crednetialKeys = Object.keys(credential);

    expect(crednetialKeys.length).toBe(2);
    expect(crednetialKeys.includes('jwt')).toBe(true);
    expect(crednetialKeys.includes('userId')).toBe(true);
  });

  test('POST /api/v1/accounts/login - incorrect request format', async () => {
    // given
    const reqBody = {
      userName: 'user_name_1'
    };

    // when
    const res = await request(app)
      .post('/api/v1/accounts/login')
      .send(reqBody)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/accounts/login - username does not exist', async () => {
    // given
    const reqBody = {
      userName: 'user_name_3',
      password: 'hashed_password_3'
    };

    // when
    const res = await request(app)
      .post('/api/v1/accounts/login')
      .send(reqBody)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(401);
  });

  test('POST /api/v1/accounts/login - password is incorrect', async () => {
    // given
    const reqBody = {
      userName: 'user_name_1',
      password: 'hashed_password_3'
    };

    // when
    const res = await request(app)
      .post('/api/v1/accounts/login')
      .send(reqBody)
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(401);
  });
});
