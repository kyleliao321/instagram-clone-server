import makeBuildAccountRepository from './account-repository';
import makeBuildUserRepository from './user-repository';
import makeHashHandler from './hash-handler';
import makeIdHandler from './id-handler';
import makeImageHandler from './image-handler';
import makeLogger from './logger';

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
