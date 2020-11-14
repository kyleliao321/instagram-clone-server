import buildMakeAccountRepository from './account-repository';
import buildMakeUserRepository from './user-repository';
import makeHashHandler from './hash-handler';
import makeIdHandler from './id-handler';
import makeLogger from './logger';

const makeAccountRepository = buildMakeAccountRepository();

const makeUserRepository = buildMakeUserRepository();

const idHandler = makeIdHandler();

const hashHandler = makeHashHandler();

const logger = makeLogger();

const accountRepository = makeAccountRepository();

const userRepository = makeUserRepository();

export { accountRepository, userRepository, idHandler, hashHandler, logger };
