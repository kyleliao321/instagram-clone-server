import {
  BuildQueryUserProfile,
  GetUserProfileService,
  QueryUserProfile,
  UserRepository
} from '../../utilities/types';

export default function makeGetUserProfileByIdService(dependency: {
  buildQueryUserProfile: BuildQueryUserProfile;
  userRepository: UserRepository;
}): GetUserProfileService {
  return async function getUserProfileByIdService(
    userId: string
  ): Promise<QueryUserProfile> {
    const userProfile = await dependency.userRepository.getUserProfile(userId);

    return dependency.buildQueryUserProfile({
      id: userProfile.id,
      userName: userProfile.userName,
      alias: userProfile.alias,
      description: userProfile.description,
      imageSrc: userProfile.imageSrc,
      postNum: userProfile.postNum,
      followerNum: userProfile.followerNum,
      followingNum: userProfile.followingNum
    });
  };
}
