import { NoContentError } from '../../utilities/http-error';
import {
  NewUserProfile,
  UserProfile,
  UserRepository
} from '../../utilities/types';

export default function makeBuildUserRepository() {
  const userProfileTable = new Map<string, UserProfile>();

  return function buildUserRepository(): UserRepository {
    return Object.freeze({
      insertNewUserProfile,
      updateUserProfile,
      getUserProfile
    });

    async function insertNewUserProfile(
      newUserProfile: NewUserProfile
    ): Promise<string> {
      const id = newUserProfile.getId();

      if (userProfileTable.has(id)) {
        throw new Error('User Profile ID has already been in database.');
      }

      userProfileTable.set(id, {
        id: newUserProfile.getId(),
        userName: newUserProfile.getUserName(),
        alias: newUserProfile.getAlias(),
        description: newUserProfile.getDescription(),
        postNum: 0,
        followerNum: 0,
        followingNum: 0
      });

      return id;
    }

    async function updateUserProfile(
      updatedUserProfile: NewUserProfile
    ): Promise<string> {
      const id = updatedUserProfile.getId();

      if (!userProfileTable.has(id)) {
        throw new Error('Updated User Profile ID does not exist in database.');
      }

      const targetUserProfile = userProfileTable.get(id);

      targetUserProfile.userName = updatedUserProfile.getUserName();
      targetUserProfile.alias = updatedUserProfile.getAlias();
      targetUserProfile.description = updatedUserProfile.getDescription();

      return id;
    }
  };

  async function getUserProfile(userId: string): Promise<UserProfile> {
    if (!userProfileTable.has(userId)) {
      throw new NoContentError(
        'Query User Profile ID doest not exist in database.'
      );
    }

    return userProfileTable.get(userId);
  }
}
