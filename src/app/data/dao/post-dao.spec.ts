import makeBuildPostDao from './post-dao';
import makeBuildUserDao from './user-dao';
import db from '../../infrastructure/database';
import { NewPost, NewUserProfile } from '../../utilities/types';

describe('post-dao', () => {
  beforeAll(async () => {
    await db.migrate.latest();

    // seeds database with valid user for post reference
    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const userName = 'user_name_1';
    const alias = 'user_alias_1';

    const newUserProfile: NewUserProfile = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getAlias: jest.fn(() => alias),
      getDescription: jest.fn(() => null),
      getEncodedImage: jest.fn(() => null)
    };

    const buildUserDao = makeBuildUserDao({ db });

    const userDao = buildUserDao();

    return await userDao.insert(newUserProfile);
  });

  afterAll(async () => {
    db('users_table').del();
    return db.migrate.rollback().then(() => db.destroy());
  });

  afterEach(async () => {
    return db('posts_table').del();
  });

  test('should return correct result when insertion is done successfully', async () => {
    // given
    const postId = 'b97239ac-56e3-4426-98c2-00e610ce6a15';
    const location = 'location';
    const timestamp = '1999-01-07T20:05:06.000Z';
    const description = 'description';
    const imageSrc = 'imageSrc';
    const postedUserId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';

    const newPost: NewPost = {
      getId: jest.fn(() => postId),
      getLocation: jest.fn(() => location),
      getDescription: jest.fn(() => description),
      getTimeStamp: jest.fn(() => timestamp),
      getEncodedImage: jest.fn(() => imageSrc),
      getPostedUserId: jest.fn(() => postedUserId)
    };

    const buildPostDao = makeBuildPostDao({ db });

    const postDao = buildPostDao();

    // when
    const result = await postDao.insert(newPost);

    // exepct
    expect(result).toStrictEqual({
      id: postId,
      location: location,
      description: description,
      timestamp: timestamp,
      imageSrc: imageSrc,
      postedUserId: postedUserId
    });
  });

  test('should return correct result when query post is existed in database', async () => {
    // given
    const postId = 'b97239ac-56e3-4426-98c2-00e610ce6a15';
    const location = 'location';
    const timestamp = '1999-01-07T20:05:06.000Z';
    const description = 'description';
    const imageSrc = 'imageSrc';
    const postedUserId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';

    const newPost: NewPost = {
      getId: jest.fn(() => postId),
      getLocation: jest.fn(() => location),
      getDescription: jest.fn(() => description),
      getTimeStamp: jest.fn(() => timestamp),
      getEncodedImage: jest.fn(() => imageSrc),
      getPostedUserId: jest.fn(() => postedUserId)
    };

    const buildPostDao = makeBuildPostDao({ db });

    const postDao = buildPostDao();

    // when
    await postDao.insert(newPost);

    const result = await postDao.getOne(postId);

    // exepct
    expect(result).toStrictEqual({
      id: postId,
      location: location,
      description: description,
      timestamp: timestamp,
      imageSrc: imageSrc,
      postedUserId: postedUserId
    });
  });

  test('should return correct result when query posts are existed in database', async () => {
    // given
    const postId = 'b97239ac-56e3-4426-98c2-00e610ce6a15';
    const location = 'location';
    const timestamp = '1999-01-07T20:05:06.000Z';
    const description = 'description';
    const imageSrc = 'imageSrc';
    const postedUserId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';

    const newPost: NewPost = {
      getId: jest.fn(() => postId),
      getLocation: jest.fn(() => location),
      getDescription: jest.fn(() => description),
      getTimeStamp: jest.fn(() => timestamp),
      getEncodedImage: jest.fn(() => imageSrc),
      getPostedUserId: jest.fn(() => postedUserId)
    };

    const buildPostDao = makeBuildPostDao({ db });

    const postDao = buildPostDao();

    // when
    await postDao.insert(newPost);

    const result = await postDao.filterByPostedUserId(postedUserId);

    // exepct
    expect(result[0]).toStrictEqual({
      id: postId,
      location: location,
      description: description,
      timestamp: timestamp,
      imageSrc: imageSrc,
      postedUserId: postedUserId
    });
  });
});
