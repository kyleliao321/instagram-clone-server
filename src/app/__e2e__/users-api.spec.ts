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

    loginUserId = res.body.credential.userId;
    loginUserToken = res.body.credential.jwt;
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
    expect(keys.length).toBe(1);
    expect(keys.includes('user')).toBe(true);

    const user = res.body.user;

    expect('id' in user).toBe(true);
    expect('userName' in user).toBe(true);
    expect('alias' in user).toBe(true);
    expect('description' in user).toBe(true);
    expect('imageSrc' in user).toBe(true);
    expect('postNum' in user).toBe(true);
    expect('followerNum' in user).toBe(true);
    expect('followingNum' in user).toBe(true);
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
    const id = loginUserId;
    const userName = 'newUserName';
    const alias = 'newAlias';
    const description = 'newDes';
    const postNum = 1;
    const followerNum = 1;
    const followingNum = 1;

    const url = `/api/v1/users/${loginUserId}`;

    // when
    const res = await request(app)
      .put(url)
      .set('Authorization', `Bearer ${loginUserToken}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'multipart/form-data')
      .field('id', id)
      .field('userName', userName)
      .field('alias', alias)
      .field('description', description)
      .field('postNum', postNum)
      .field('followerNum', followerNum)
      .field('followingNum', followingNum);

    // expect
    expect(res.status).toBe(200);
  });

  test('PUT /api/v1/users/:userId - incorrect request body format', async () => {
    // given
    const userName = 'newUserName';
    const alias = 'newAlias';
    const description = 'newDes';
    const postNum = 1;
    const followerNum = 1;
    const followingNum = 1;

    const url = `/api/v1/users/${loginUserId}`;

    // when
    const res = await request(app)
      .put(url)
      .set('Authorization', `Bearer ${loginUserToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('userName', userName)
      .field('alias', alias)
      .field('description', description)
      .field('postNum', postNum)
      .field('followerNum', followerNum)
      .field('followingNum', followingNum);

    // expect
    expect(res.status).toBe(400);
  });

  test('PUT /api/v1/users/:userId - duplicated username', async () => {
    // given
    const id = loginUserId;
    const userName = 'newUserName';
    const alias = 'newAlias';
    const description = 'newDes';
    const postNum = 1;
    const followerNum = 1;
    const followingNum = 1;

    const duplicatedUserName = 'user_name_2';

    const url = `/api/v1/users/${loginUserId}`;

    // when
    const res = await request(app)
      .put(url)
      .set('Authorization', `Bearer ${loginUserToken}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'multipart/form-data')
      .field('id', id)
      .field('userName', duplicatedUserName)
      .field('alias', alias)
      .field('description', description)
      .field('postNum', postNum)
      .field('followerNum', followerNum)
      .field('followingNum', followingNum);

    // expect
    expect(res.status).toBe(409);
  });
});
