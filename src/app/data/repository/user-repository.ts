import {
  NewUserProfile,
  UpdatedUserProfile,
  UserDao,
  UserProfile,
  UserRepository
} from '../../utilities/types';

export default function makeBuildUserRepository(dependencies: {
  userDao: UserDao;
}) {
  return function buildUserRepository(): UserRepository {
    return Object.freeze({
      insertNewUserProfile,
      updateUserProfile,
      getUserProfile,
      filterUserProfilesByUserName
    });

    async function insertNewUserProfile(
      newUserProfile: NewUserProfile
    ): Promise<string> {
      return await dependencies.userDao.insert(newUserProfile);
    }

    async function updateUserProfile(
      updatedUserProfile: UpdatedUserProfile
    ): Promise<string> {
      return await dependencies.userDao.update(updatedUserProfile);
    }

    async function getUserProfile(userId: string): Promise<UserProfile> {
      return await dependencies.userDao.getOne(userId);
    }

    async function filterUserProfilesByUserName(
      userName: string
    ): Promise<UserProfile[]> {
      return await dependencies.userDao.filter(userName);
    }
  };
}
