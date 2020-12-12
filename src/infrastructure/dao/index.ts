import makeBuildUserDao from './user-dao';

const buildUserDao = makeBuildUserDao();

const userDao = buildUserDao();

export { userDao };
