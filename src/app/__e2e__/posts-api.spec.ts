import request from 'supertest';
import app from '../';
import db from '../infrastructure/database';
import { join } from 'path';
import fse from 'fs-extra';

describe('posts-api-test', () => {
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
  const mockEncodedImageFilePath = join(
    process.cwd(),
    '__test__',
    'fixtures',
    'mock-encoded-image'
  );
  const publicImagesTestDirPath = join(
    process.cwd(),
    'public',
    'images',
    'test'
  );

  let loginUserId: string;
  let loginUserToken: string;

  beforeAll(async () => {
    await fse.copy(imageSrcPath, imageDesPath);

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
    await fse.remove(publicImagesTestDirPath);

    return db.migrate.rollback().then(() => db.destroy());
  });

  test('GET /api/v1/posts/:postId - succeed', async () => {
    // given
    const postId = 'a727ccd6-bd17-4eaf-a1c7-b14993589c37';

    const url = `/api/v1/posts/${postId}`;

    // when
    const res = await request(app).get(url).set('Accept', 'application/json');

    const keys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(200);
    expect(keys.length).toBe(6);
    expect(keys.includes('id')).toBe(true);
    expect(keys.includes('description')).toBe(true);
    expect(keys.includes('location')).toBe(true);
    expect(keys.includes('timestamp')).toBe(true);
    expect(keys.includes('imageSrc')).toBe(true);
    expect(keys.includes('postedUserId')).toBe(true);
  });

  test('GET /api/v1/posts/:postId - post does not exist', async () => {
    // given
    const postId = '12fb4169-22aa-42d6-9d16-eda752db00a5';

    const url = `/api/v1/posts/${postId}`;

    // when
    const res = await request(app).get(url).set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(404);
  });

  test('GET /api/v1/posts/ filter by postedUserId - succeed', async () => {
    // given
    const postedUserId = '4fbc9df6-556e-45f5-928e-1bc39a79317f';

    const reqQuery = {
      userId: postedUserId
    };

    // when
    const res = await request(app)
      .get('/api/v1/posts/')
      .query(reqQuery)
      .set('Accept', 'application/json');

    const keys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(200);
    expect(keys.length).toBe(1);
    expect(keys.includes('posts')).toBe(true);
    expect(res.body.posts.length).toBe(1);
  });

  test('GET /api/v1/posts/ filter by postedUserId - request without query', async () => {
    // when
    const res = await request(app)
      .get('/api/v1/posts')
      .set('Accept', 'application/json');

    // expect
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/posts/ - succeed', async () => {
    // given
    const timestamp = '1999-01-07T20:05:06.000Z';
    const postedUserId = loginUserId;

    // when
    const res = await request(app)
      .post('/api/v1/posts/')
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${loginUserToken}`)
      .set('Accept', 'application/json')
      .field('timestamp', timestamp)
      .field('postedUserId', postedUserId)
      .attach('postImage', imageSrcPath);

    const keys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(201);
    expect(keys.length).toBe(6);
    expect(keys.includes('id')).toBe(true);
    expect(keys.includes('description')).toBe(true);
    expect(keys.includes('location')).toBe(true);
    expect(keys.includes('imageSrc')).toBe(true);
    expect(keys.includes('timestamp')).toBe(true);
    expect(keys.includes('postedUserId')).toBe(true);
  });

  test('POST /api/v1/posts/ - incorrect request format', async () => {
    // when
    const res = await request(app)
      .post('/api/v1/posts/')
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${loginUserToken}`)
      .set('Accept', 'application/json')
      .attach('postImage', imageSrcPath);

    const keys = Object.keys(res.body);

    // expect
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/posts/ - unauthorized access', async () => {
    // given
    const timestamp = '1999-01-07T20:05:06.000Z';
    const postedUserId = 'a471fe7c-f728-4e31-801e-1776e854fb2d';

    // when
    const res = await request(app)
      .post('/api/v1/posts/')
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${loginUserToken}`)
      .set('Accept', 'application/json')
      .field('timestamp', timestamp)
      .field('postedUserId', postedUserId)
      .attach('postImage', imageSrcPath);

    // expect
    expect(res.status).toBe(401);
  });

  test('POST /api/v1/posts/ - request without encodedImage', async () => {
    // given
    const timestamp = '1999-01-07T20:05:06.000Z';
    const postedUserId = 'a471fe7c-f728-4e31-801e-1776e854fb2d';

    // when
    const res = await request(app)
      .post('/api/v1/posts/')
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${loginUserToken}`)
      .set('Accept', 'application/json')
      .field('timestamp', timestamp)
      .field('postedUserId', postedUserId);

    // expect
    expect(res.status).toBe(400);
  });
});
