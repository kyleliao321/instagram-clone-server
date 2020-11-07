import { BuildNewUserProfile, NewUserProfileInfo, UserRepository } from "../../utilities/types";

export default function buildAddNewUserProfile(dependency: {
    buildNewUserProfile: BuildNewUserProfile,
    userRepository: UserRepository
}) {
    return async function addNewUserProfile(newUserProfileInfo: NewUserProfileInfo): Promise<string> {
        const newUserProfile = dependency.buildNewUserProfile(newUserProfileInfo);

        return dependency.userRepository.insertNewUserProfile(newUserProfile);
    }
}