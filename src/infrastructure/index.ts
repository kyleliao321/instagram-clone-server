import makeBuildAccountRepository from './repository/account-repository';
import makeBuildUserRepository from './repository/user-repository';
import makeBuildRelationRepository from './repository/relation-repository';
import makeBuildPostRepository from './repository/post-repository';
import makeBuildLikeSystemRepository from './repository/like-system-repository';
import makeAuthHandler from './auth-handler/auth-handler';
import makeHashHandler from './hash-handler/hash-handler';
import makeIdHandler from './id-handler/id-handler';
import makeImageHandler from './image-handler/image-handler';
import makeLogger from './logger/logger';
import { userDao } from './dao';

const buildAccountRepository = makeBuildAccountRepository();

const buildUserRepository = makeBuildUserRepository({ userDao });

const buildRelationRepository = makeBuildRelationRepository();

const buildPostRepository = makeBuildPostRepository();

const buildLikeSystemRepository = makeBuildLikeSystemRepository();

const idHandler = makeIdHandler();

const hashHandler = makeHashHandler();

const imageHandler = makeImageHandler();

const authHandler = makeAuthHandler();

const logger = makeLogger();

const accountRepository = buildAccountRepository();

const userRepository = buildUserRepository();

const relationRepository = buildRelationRepository();

const postRepository = buildPostRepository();

const likeSystemRepository = buildLikeSystemRepository();

export {
  accountRepository,
  userRepository,
  relationRepository,
  postRepository,
  likeSystemRepository,
  idHandler,
  hashHandler,
  imageHandler,
  authHandler,
  logger
};
