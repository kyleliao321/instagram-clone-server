import makeBuildAccountRepository from './repository/account-repository';
import makeBuildUserRepository from './repository/user-repository';
import makeHashHandler from './hash-handler/hash-handler';
import makeIdHandler from './id-handler/id-handler';
import makeImageHandler from './image-handler/image-handler';
import makeLogger from './logger/logger';

const buildAccountRepository = makeBuildAccountRepository();

const buildUserRepository = makeBuildUserRepository();

const idHandler = makeIdHandler();

const hashHandler = makeHashHandler();

const imageHandler = makeImageHandler();

const logger = makeLogger();

const accountRepository = buildAccountRepository();

const userRepository = buildUserRepository();

export {
  accountRepository,
  userRepository,
  idHandler,
  hashHandler,
  imageHandler,
  logger
};
