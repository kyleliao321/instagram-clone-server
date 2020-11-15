import {
  BuildNewUserProfile,
  NewUserProfileInfo,
  UpdateUserProfileService,
  UserRepository
} from '../../utilities/types';

export default function makeUpdateUserProfile(dependency: {
  buildNewUserProfile: BuildNewUserProfile;
  userRepository: UserRepository;
}): UpdateUserProfileService {
  return async function updateUserProfile(
    userProfileInfo: NewUserProfileInfo
  ): Promise<string> {
    const userProfile = dependency.buildNewUserProfile(userProfileInfo);

    return dependency.userRepository.updateUserProfile(userProfile);
  };
}
