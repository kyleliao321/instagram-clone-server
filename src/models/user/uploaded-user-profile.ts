import { BuildNewUserProfile, IdHandler, NewUserProfile, NewUserProfileInfo } from "../../utilities/types";

export default function makeBuildNewUserProfile(dependency: {
    idHandler: IdHandler
}): BuildNewUserProfile {
    return function buildNewUserProfile(newUserProfileInfo: NewUserProfileInfo): NewUserProfile {

        if (!dependency.idHandler.isValid(newUserProfileInfo.id)) {
            throw new Error('User Profile must have a valid id.');
        }

        // TODO: do some image byte array verification or pre-processing

        return Object.freeze({
            getId: () => newUserProfileInfo.id,
            getUserName: () => newUserProfileInfo.userName,
            getAlias: () => newUserProfileInfo.alias === undefined ? newUserProfileInfo.userName : newUserProfileInfo.alias,
            getDescription: () => newUserProfileInfo.description,
            getImageByteArray: () => newUserProfileInfo.imageByteArray
        });
    };
}