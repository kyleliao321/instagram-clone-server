import {
  AddNewUserProfileService,
  BuildNewUserProfile,
  NewUserProfileInfo,
  UserRepository
} from '../../utilities/types';

export default function buildAddNewUserProfile(dependency: {
  buildNewUserProfile: BuildNewUserProfile;
  userRepository: UserRepository;
}): AddNewUserProfileService {
  return async function addNewUserProfile(
    newUserProfileInfo: NewUserProfileInfo
  ): Promise<string> {
    const newUserProfile = dependency.buildNewUserProfile(newUserProfileInfo);

    return dependency.userRepository.insertNewUserProfile(newUserProfile);
  };
}
