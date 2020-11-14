import {
  NewUserProfile,
  UserProfile,
  UserRepository
} from '../utilities/types';

export default function buildMakeUserRepository() {
  const userProfileTable = new Map<string, UserProfile>();

  return function makeUserRepository(): UserRepository {
    return Object.freeze({
      insertNewUserProfile
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
  };
}
