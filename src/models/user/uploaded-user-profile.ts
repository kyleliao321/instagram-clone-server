import { NewUserProfile } from "../../utilities/types";

export default function makeBuildNewUserProfile() {
    return function buildNewUserProfile(newUserProfileInfo: {
        userName: string,
        alias?: string,
        description?: string,
        imageByteArray?: Int8Array
    }): NewUserProfile {

        // TODO: do some image byte array verification or pre-processing

        return Object.freeze({
            getUserName: () => newUserProfileInfo.userName,
            getAlias: () => newUserProfileInfo.alias === undefined ? newUserProfileInfo.userName : newUserProfileInfo.alias,
            getDescription: () => newUserProfileInfo.description,
            getImageByteArray: () => newUserProfileInfo.imageByteArray
        });
    };
}