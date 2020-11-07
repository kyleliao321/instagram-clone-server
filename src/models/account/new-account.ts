import { IdHandler, HashHandler, NewAccount, BuildNewAccount, NewAccountInfo } from '../../utilities/types';

export default function makeBuildNewAccount(dependency: { 
    idHandler: IdHandler,
    hashHandler: HashHandler
 }): BuildNewAccount {
    return function buildNewAccount(newAccountInfo: NewAccountInfo): NewAccount {

        const id = dependency.idHandler.getId();

        if (!dependency.idHandler.isValid(id)) {
            throw new Error('New Account must have a valid id.');
        }

        const hashedPassword = dependency.hashHandler.hash(newAccountInfo.password);

        return Object.freeze({
            getId: () => id,
            getUserName: () => newAccountInfo.userName,
            getHashedPassword: () => hashedPassword
        });
    };
}
