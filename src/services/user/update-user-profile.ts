import {
  BuildNewUserProfile,
  NewUserProfileInfo,
  UpdateUserProfile,
  UserRepository
} from '../../utilities/types';

export default function makeUpdateUserProfile(dependency: {
  buildNewUserProfile: BuildNewUserProfile;
  userRepository: UserRepository;
}): UpdateUserProfile {
  return async function updateUserProfile(
    userProfileInfo: NewUserProfileInfo
  ): Promise<string> {
    const userProfile = dependency.buildNewUserProfile(userProfileInfo);

    return dependency.userRepository.updateUserProfile(userProfile);
  };
}
