import { NewUserProfile, UserRepository } from '../utilities/types';

export default function buildMakeUserRepository() {
  return function makeUserRepository(): UserRepository {

    return Object.freeze({
      insertNewUserProfile
    });

    async function insertNewUserProfile(
      newUserProfile: NewUserProfile
    ): Promise<string> {
      return newUserProfile.getId();
    }
  }
}
