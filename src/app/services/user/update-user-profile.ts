import {
  BuildUpdatedUserProfile,
  UpdateUserProfileServiceInfo,
  UpdateUserProfileService,
  UserRepository
} from '../../utilities/types';

export default function makeUpdateUserProfileService(dependencies: {
  buildUpdatedUserProfile: BuildUpdatedUserProfile;
  userRepository: UserRepository;
}): UpdateUserProfileService {
  return async function updateUserProfileService(
    userProfileInfo: UpdateUserProfileServiceInfo
  ): Promise<string> {
    const originalUserProfile = await dependencies.userRepository.getUserProfile(
      userProfileInfo.id
    );

    const updatedUserProfile = dependencies.buildUpdatedUserProfile({
      id: userProfileInfo.id,
      userName: userProfileInfo.userName ?? originalUserProfile.userName,
      alias: userProfileInfo.alias ?? originalUserProfile.alias,
      description:
        userProfileInfo.description ?? originalUserProfile.description,
      encodedImage: userProfileInfo.encodedImage,
      postNum: userProfileInfo.postNum ?? originalUserProfile.postNum,
      followerNum:
        userProfileInfo.followerNum ?? originalUserProfile.followerNum,
      followingNum:
        userProfileInfo.followingNum ?? originalUserProfile.followingNum
    });

    return await dependencies.userRepository.updateUserProfile(
      updatedUserProfile
    );
  };
}
