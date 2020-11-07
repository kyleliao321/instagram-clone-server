import { IdHandler, HashHandler, NewAccount } from '../../utilities/types';

export default function makeBuildNewAccount(dependency: { 
    idHandler: IdHandler,
    hashHandler: HashHandler
 }) {
    return function buildNewAccount(newAccountInfo: {
        userName: string,
        password: string
    }): NewAccount {

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
