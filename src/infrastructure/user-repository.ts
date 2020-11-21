import {
  NewUserProfile,
  UserProfile,
  UserRepository
} from '../utilities/types';

export default function makeBuildUserRepository() {
  const userProfileTable = new Map<string, UserProfile>();

  return function buildUserRepository(): UserRepository {
    return Object.freeze({
      insertNewUserProfile,
      updateUserProfile
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
        description: newUserProfile.getDescription()
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
}
