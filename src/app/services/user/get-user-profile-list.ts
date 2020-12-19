import {
  BuildQueryUserProfile,
  GetUserProfileListService,
  QueryUserProfile,
  UserRepository
} from '../../utilities/types';

export default function makeGetUserProfileListService(dependency: {
  buildQueryUserProfile: BuildQueryUserProfile;
  userRepository: UserRepository;
}): GetUserProfileListService {
  return async function getUserProfileListService(
    userName: string
  ): Promise<QueryUserProfile[]> {
    const userProfileList = await dependency.userRepository.filterUserProfilesByUserName(
      userName
    );

    return userProfileList.map((userProfile) =>
      dependency.buildQueryUserProfile(userProfile)
    );
  };
}
