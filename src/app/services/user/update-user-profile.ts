import {
  BuildUpdatedUserProfile,
  UpdatedUserProfileInfo,
  UpdateUserProfileService,
  UserRepository
} from '../../utilities/types';

export default function makeUpdateUserProfileService(dependency: {
  buildUpdatedUserProfile: BuildUpdatedUserProfile;
  userRepository: UserRepository;
}): UpdateUserProfileService {
  return async function updateUserProfileService(
    userProfileInfo: UpdatedUserProfileInfo
  ): Promise<string> {
    const userProfile = dependency.buildUpdatedUserProfile(userProfileInfo);

    return dependency.userRepository.updateUserProfile(userProfile);
  };
}
