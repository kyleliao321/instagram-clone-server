import {
  BuildUpdatedUserProfile,
  UpdatedUserProfileInfo,
  UpdateUserProfileService,
  UserRepository
} from '../../utilities/types';

export default function makeUpdateUserProfile(dependency: {
  buildUpdatedUserProfile: BuildUpdatedUserProfile;
  userRepository: UserRepository;
}): UpdateUserProfileService {
  return async function updateUserProfile(
    userProfileInfo: UpdatedUserProfileInfo
  ): Promise<string> {
    const userProfile = dependency.buildUpdatedUserProfile(userProfileInfo);

    return dependency.userRepository.updateUserProfile(userProfile);
  };
}
