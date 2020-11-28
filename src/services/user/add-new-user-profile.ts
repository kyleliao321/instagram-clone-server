import {
  AddNewUserProfileService,
  BuildNewUserProfile,
  NewUserProfileInfo,
  UserRepository
} from '../../utilities/types';

export default function buildAddNewUserProfileService(dependency: {
  buildNewUserProfile: BuildNewUserProfile;
  userRepository: UserRepository;
}): AddNewUserProfileService {
  return async function addNewUserProfileService(
    newUserProfileInfo: NewUserProfileInfo
  ): Promise<string> {
    const newUserProfile = dependency.buildNewUserProfile(newUserProfileInfo);

    return dependency.userRepository.insertNewUserProfile(newUserProfile);
  };
}
