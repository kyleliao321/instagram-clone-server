import { NewUserProfile, UserRepository } from '../utilities/types';

export default function makeUserRepository(): UserRepository {

    async function insertNewUserProfile(newUserProfile: NewUserProfile): Promise<string> {
        return newUserProfile.getId();
    }

    return Object.freeze({
        insertNewUserProfile
    })
}