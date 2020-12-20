import makeBuildUserDao from './user-dao';
import { db } from '../../infrastructure';
import { NewUserProfile, UpdatedUserProfile } from '../../utilities/types';

describe('user-dao', () => {
  beforeAll(async () => {
    return await db.migrate.latest();
  });

  afterAll(async () => {
    return db.migrate.rollback().then(() => db.destroy());
  });

  afterEach(async () => {
    return db('users_table').del();
  });

  test('should get correct user data after user data is inserted into database - scenario 1', async () => {
    // given
    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const userName = 'user_name_1';
    const alias = 'user_alias_1';

    const newUserProfile: NewUserProfile = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getAlias: jest.fn(() => alias),
      getDescription: jest.fn(() => null),
      getEncodedImage: jest.fn(() => null),
      getImageSrc: jest.fn(() => Promise.resolve(null))
    };

    const buildUserDao = makeBuildUserDao({ db });

    const userDao = buildUserDao();

    // when
    await userDao.insert(newUserProfile);
    const result = await userDao.getOne(userId);

    // expect
    expect(result).toStrictEqual({
      id: userId,
      userName: userName,
      alias: alias,
      description: '',
      imageSrc: undefined,
      postNum: 0,
      followerNum: 0,
      followingNum: 0
    });
  });

  test('should get correct user data after user data is inserted into database - scenario 2', async () => {
    // given
    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const userName = 'user_name_1';
    const alias = 'user_alias_1';
    const description = 'user_description_1';
    const imageSrc = 'user_image_src_1';

    const newUserProfile: NewUserProfile = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getAlias: jest.fn(() => alias),
      getDescription: jest.fn(() => description),
      getEncodedImage: jest.fn(),
      getImageSrc: jest.fn(() => Promise.resolve(imageSrc))
    };

    const buildUserDao = makeBuildUserDao({ db });

    const userDao = buildUserDao();

    // when
    await userDao.insert(newUserProfile);
    const result = await userDao.getOne(userId);

    // expect
    expect(result).toStrictEqual({
      id: userId,
      userName: userName,
      alias: alias,
      description: description,
      imageSrc: imageSrc,
      postNum: 0,
      followerNum: 0,
      followingNum: 0
    });
  });

  test('should get correct user data after user data is updated - scenario 1', async () => {
    // given
    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const userName = 'user_name_1';
    const alias = 'user_alias_1';
    const description = 'user_description_1';
    const imageSrc = 'user_image_src_1';
    const postNum = 1;
    const followerNum = 2;
    const followingNum = 3;

    const newUserProfile: NewUserProfile = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getAlias: jest.fn(() => alias),
      getDescription: jest.fn(() => description),
      getEncodedImage: jest.fn(),
      getImageSrc: jest.fn(() => Promise.resolve(imageSrc))
    };

    const updatedUserProfile: UpdatedUserProfile = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getAlias: jest.fn(() => alias),
      getDescription: jest.fn(() => description),
      getEncodedImage: jest.fn(),
      getPostNum: jest.fn(() => postNum),
      getFollowerNum: jest.fn(() => followerNum),
      getFollowingNum: jest.fn(() => followingNum),
      getImageSrc: jest.fn(() => Promise.resolve(null))
    };

    const buildUserDao = makeBuildUserDao({ db });

    const userDao = buildUserDao();

    // when
    await userDao.insert(newUserProfile);
    await userDao.update(updatedUserProfile);
    const result = await userDao.getOne(userId);

    // expect
    expect(result).toStrictEqual({
      id: userId,
      userName: userName,
      alias: alias,
      description: description,
      imageSrc: imageSrc,
      postNum: postNum,
      followerNum: followerNum,
      followingNum: followingNum
    });
  });

  test('should get correct user data after user data is updated - scenario 2', async () => {
    // given
    const userId = '1229d5f3-3e5a-4a21-a2ed-f3149833222c';
    const userName = 'user_name_1';
    const alias = 'user_alias_1';
    const description = 'user_description_1';
    const imageSrc = 'user_image_src_1';
    const updatedImageSrc = 'user_image_src_2';
    const postNum = 1;
    const followerNum = 2;
    const followingNum = 3;

    const newUserProfile: NewUserProfile = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getAlias: jest.fn(() => alias),
      getDescription: jest.fn(() => description),
      getEncodedImage: jest.fn(),
      getImageSrc: jest.fn(() => Promise.resolve(imageSrc))
    };

    const updatedUserProfile: UpdatedUserProfile = {
      getId: jest.fn(() => userId),
      getUserName: jest.fn(() => userName),
      getAlias: jest.fn(() => alias),
      getDescription: jest.fn(() => description),
      getEncodedImage: jest.fn(),
      getPostNum: jest.fn(() => postNum),
      getFollowerNum: jest.fn(() => followerNum),
      getFollowingNum: jest.fn(() => followingNum),
      getImageSrc: jest.fn(() => Promise.resolve(updatedImageSrc))
    };

    const buildUserDao = makeBuildUserDao({ db });

    const userDao = buildUserDao();

    // when
    await userDao.insert(newUserProfile);
    await userDao.update(updatedUserProfile);
    const result = await userDao.getOne(userId);

    // expect
    expect(result).toStrictEqual({
      id: userId,
      userName: userName,
      alias: alias,
      description: description,
      imageSrc: updatedImageSrc,
      postNum: postNum,
      followerNum: followerNum,
      followingNum: followingNum
    });
  });
});
