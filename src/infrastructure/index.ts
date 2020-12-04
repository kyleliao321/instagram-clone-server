import makeBuildAccountRepository from './repository/account-repository';
import makeBuildUserRepository from './repository/user-repository';
import makeBuildRelationRepository from './repository/relation-repository';
import makeAuthHandler from './auth-handler/auth-handler';
import makeHashHandler from './hash-handler/hash-handler';
import makeIdHandler from './id-handler/id-handler';
import makeImageHandler from './image-handler/image-handler';
import makeLogger from './logger/logger';

const buildAccountRepository = makeBuildAccountRepository();

const buildUserRepository = makeBuildUserRepository();

const buildRelationRepository = makeBuildRelationRepository();

const idHandler = makeIdHandler();

const hashHandler = makeHashHandler();

const imageHandler = makeImageHandler();

const authHandler = makeAuthHandler();

const logger = makeLogger();

const accountRepository = buildAccountRepository();

const userRepository = buildUserRepository();

const relationRepository = buildRelationRepository();

export {
  accountRepository,
  userRepository,
  relationRepository,
  idHandler,
  hashHandler,
  imageHandler,
  authHandler,
  logger
};
