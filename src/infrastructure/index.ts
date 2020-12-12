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
import makeBuildUserDao from './dao/user-dao';
import makeBuildAccountDao from './dao/account-dao';
import makeBuildRelationDao from './dao/relation-dao';
import makeBuildPostDao from './dao/post-dao';
import makeBuildLikeSystemDao from './dao/like-system-dao';

// initialize data-access-objects
const buildUserDao = makeBuildUserDao();

const buildAccountDao = makeBuildAccountDao();

const buildRelationDao = makeBuildRelationDao();

const buildPostDao = makeBuildPostDao();

const buildLikeSystemDao = makeBuildLikeSystemDao();

const userDao = buildUserDao();

const accountDao = buildAccountDao();

const relationDao = buildRelationDao();

const postDao = buildPostDao();

const likeSystemDao = buildLikeSystemDao();

// initialize repositories

const buildAccountRepository = makeBuildAccountRepository({ accountDao });

const buildUserRepository = makeBuildUserRepository({ userDao });

const buildRelationRepository = makeBuildRelationRepository({ relationDao });

const buildPostRepository = makeBuildPostRepository({ postDao });

const buildLikeSystemRepository = makeBuildLikeSystemRepository({
  likeSystemDao
});

const accountRepository = buildAccountRepository();

const userRepository = buildUserRepository();

const relationRepository = buildRelationRepository();

const postRepository = buildPostRepository();

const likeSystemRepository = buildLikeSystemRepository();

// initialize handlers

const idHandler = makeIdHandler();

const hashHandler = makeHashHandler();

const imageHandler = makeImageHandler();

const authHandler = makeAuthHandler();

const logger = makeLogger();

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
