import makeBuildAccountRepository from './repository/account-repository';
import makeBuildUserRepository from './repository/user-repository';
import makeBuildRelationRepository from './repository/relation-repository';
import makeBuildPostRepository from './repository/post-repository';
import makeBuildLikeSystemRepository from './repository/like-system-repository';
import makeBuildUserDao from './dao/user-dao';
import makeBuildAccountDao from './dao/account-dao';
import makeBuildRelationDao from './dao/relation-dao';
import makeBuildPostDao from './dao/post-dao';
import makeBuildLikeSystemDao from './dao/like-system-dao';
import db from '../../db';

// initialize data-access-objects
const buildUserDao = makeBuildUserDao({ db });

const buildAccountDao = makeBuildAccountDao({ db });

const buildRelationDao = makeBuildRelationDao({ db });

const buildPostDao = makeBuildPostDao({ db });

const buildLikeSystemDao = makeBuildLikeSystemDao({ db });

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

export {
  accountRepository,
  userRepository,
  relationRepository,
  postRepository,
  likeSystemRepository
};
