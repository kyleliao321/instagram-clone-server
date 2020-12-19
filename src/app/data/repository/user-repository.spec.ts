import {
  NewUserProfile,
  UpdatedUserProfile,
  UserDao
} from '../../utilities/types';
import makeBuildUserRepository from './user-repository';

describe('user-repository', () => {
  test('should trigger userDao.insert while invoke insertNewUserProfile', async () => {
    // given
    const mockNewUserProfile: NewUserProfile = {
      getId: jest.fn(),
      getUserName: jest.fn(),
      getAlias: jest.fn(),
      getDescription: jest.fn(),
      getEncodedImage: jest.fn()
    };

    const mockUserDao: UserDao = {
      insert: jest.fn(),
      update: jest.fn(),
      getOne: jest.fn(),
      filter: jest.fn()
    };

    const buildUserRepository = makeBuildUserRepository({
      userDao: mockUserDao
    });
    const userRepository = buildUserRepository();

    // when
    await userRepository.insertNewUserProfile(mockNewUserProfile);

    // expect
    expect(mockUserDao.insert).toHaveBeenCalledTimes(1);
  });

  test('should trigger userDao.update while invoke updateUserProfile', async () => {
    // given
    const mockUpdatedUserProfile: UpdatedUserProfile = {
      getId: jest.fn(),
      getUserName: jest.fn(),
      getAlias: jest.fn(),
      getDescription: jest.fn(),
      getEncodedImage: jest.fn(),
      getPostNum: jest.fn(),
      getFollowerNum: jest.fn(),
      getFollowingNum: jest.fn()
    };

    const mockUserDao: UserDao = {
      insert: jest.fn(),
      update: jest.fn(),
      getOne: jest.fn(),
      filter: jest.fn()
    };

    const buildUserRepository = makeBuildUserRepository({
      userDao: mockUserDao
    });
    const userRepository = buildUserRepository();

    // when
    await userRepository.updateUserProfile(mockUpdatedUserProfile);

    // expect
    expect(mockUserDao.update).toHaveBeenCalledTimes(1);
  });

  test('should trigger userDao.getOne while invoke getUserProfile', async () => {
    // given
    const mockUserID = 'mockUserId';

    const mockUserDao: UserDao = {
      insert: jest.fn(),
      update: jest.fn(),
      getOne: jest.fn(),
      filter: jest.fn()
    };

    const buildUserRepository = makeBuildUserRepository({
      userDao: mockUserDao
    });
    const userRepository = buildUserRepository();

    // when
    await userRepository.getUserProfile(mockUserID);

    // expect
    expect(mockUserDao.getOne).toHaveBeenCalledTimes(1);
  });

  test('should trigger userDao.filter while invoke filterUserProfilesByUserName', async () => {
    // given
    const mockUserName = 'mockUserName';

    const mockUserDao: UserDao = {
      insert: jest.fn(),
      update: jest.fn(),
      getOne: jest.fn(),
      filter: jest.fn()
    };

    const buildUserRepository = makeBuildUserRepository({
      userDao: mockUserDao
    });
    const userRepository = buildUserRepository();

    // when
    await userRepository.filterUserProfilesByUserName(mockUserName);

    // expect
    expect(mockUserDao.filter).toHaveBeenCalledTimes(1);
  });
});
