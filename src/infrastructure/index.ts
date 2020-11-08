import makeAccountRepository from './account-repository';
import makeUserRepository from './user-repository';
import makeHashHandler from './hash-handler';
import makeIdHandler from './id-handler';

const accountRepository = makeAccountRepository();

const userRepository = makeUserRepository();

const idHandler = makeIdHandler();

const hashHandler = makeHashHandler();

export {
    accountRepository,
    userRepository,
    idHandler,
    hashHandler
}