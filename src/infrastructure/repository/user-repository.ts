import { NoContentError } from '../../utilities/http-error';
import {
  NewUserProfile,
  UpdatedUserProfile,
  UserProfile,
  UserRepository
} from '../../utilities/types';

export default function makeBuildUserRepository() {
  const userProfileTable = new Map<string, UserProfile>();

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
      updatedUserProfile: UpdatedUserProfile
    ): Promise<string> {
      const id = updatedUserProfile.getId();

      if (!userProfileTable.has(id)) {
        throw new NoContentError(
          'Updated User Profile ID does not exist in database.'
        );
      }

      const targetUserProfile = userProfileTable.get(id);

      targetUserProfile.userName = updatedUserProfile.getUserName();
      targetUserProfile.alias = updatedUserProfile.getAlias();
      targetUserProfile.description = updatedUserProfile.getDescription();
      targetUserProfile.postNum = updatedUserProfile.getPostNum();
      targetUserProfile.followerNum = updatedUserProfile.getFollowerNum();
      targetUserProfile.followingNum = updatedUserProfile.getFollowingNum();

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

  async function filterUserProfilesByUserName(
    userName: string
  ): Promise<UserProfile[]> {
    const userProfileArray = Array.from(userProfileTable.values());

    return userProfileArray.filter((userProfile) =>
      userProfile.userName.includes(userName)
    );
  }
}
