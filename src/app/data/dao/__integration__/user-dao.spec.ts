import makeBuildUserDao from '../user-dao';
import { db } from '../../../infrastructure';
import { NewUserProfile, UpdatedUserProfile } from '../../../utilities/types';
import { ConflictError } from '../../../utilities/http-error';

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

  test('should get correct list of user profile when filter user name exists', async () => {
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
    const result = await userDao.filter('name');

    // expect
    expect(result.length).toBe(1);
    expect(result[0]).toStrictEqual({
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

  test('should get correct list of user profile when filter user name does not exist', async () => {
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
    const result = await userDao.filter('test');

    // expect
    expect(result.length).toBe(0);
  });

  test('should throw http conflict error when updated user profile username is already existed in database', async () => {
    // given
    const shouldNotBeCalled = jest.fn();
    const duplicatedUserName = 'duplicatedUserName';

    const exitedUserProfile: NewUserProfile = {
      getId: jest.fn(() => '1229d5f3-3e5a-4a21-a2ed-f3149833222c'),
      getUserName: jest.fn(() => duplicatedUserName),
      getAlias: jest.fn(() => 'alias'),
      getDescription: jest.fn(() => 'Des'),
      getEncodedImage: jest.fn(),
      getImageSrc: jest.fn(() => Promise.resolve('image'))
    };

    const targetUserProfile: NewUserProfile = {
      getId: jest.fn(() => '2c5ad7bc-4c81-4e5a-8c78-499a407b000f'),
      getUserName: jest.fn(() => 'mockUserName'),
      getAlias: jest.fn(() => 'alias'),
      getDescription: jest.fn(() => 'Des'),
      getEncodedImage: jest.fn(),
      getImageSrc: jest.fn(() => Promise.resolve('image'))
    };

    const updatedUserProfile: UpdatedUserProfile = {
      getId: jest.fn(() => '2c5ad7bc-4c81-4e5a-8c78-499a407b000f'),
      getUserName: jest.fn(() => duplicatedUserName),
      getAlias: jest.fn(() => 'alias'),
      getDescription: jest.fn(() => 'Des'),
      getEncodedImage: jest.fn(),
      getPostNum: jest.fn(() => 0),
      getFollowerNum: jest.fn(() => 0),
      getFollowingNum: jest.fn(() => 0),
      getImageSrc: jest.fn(() => Promise.resolve('image'))
    };

    const buildUserDao = makeBuildUserDao({ db });
    const userDao = buildUserDao();

    // When
    await userDao.insert(exitedUserProfile);
    await userDao.insert(targetUserProfile);

    try {
      await userDao.update(updatedUserProfile);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(ConflictError);
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
  });
});
