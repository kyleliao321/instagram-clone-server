import makeAccountRepository from './account-repository';
import makeUserRepository from './user-repository';
import makeHashHandler from './hash-handler';
import makeIdHandler from './id-handler';
import makeLogger from './logger';

const accountRepository = makeAccountRepository();

const userRepository = makeUserRepository();

const idHandler = makeIdHandler();

const hashHandler = makeHashHandler();

const logger = makeLogger();

export { accountRepository, userRepository, idHandler, hashHandler, logger };
