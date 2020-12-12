import makeAuthHandler from './auth-handler/auth-handler';
import makeHashHandler from './hash-handler/hash-handler';
import makeIdHandler from './id-handler/id-handler';
import makeImageHandler from './image-handler/image-handler';
import makeLogger from './logger/logger';
import makeBuildQueryHandler from './query-handler/query-handler';

// initialize handlers

const idHandler = makeIdHandler();

const hashHandler = makeHashHandler();

const imageHandler = makeImageHandler();

const authHandler = makeAuthHandler();

const logger = makeLogger();

const buildQueryHandler = makeBuildQueryHandler({
  paths: [process.cwd(), 'db', 'queries']
});

const queryHandler = buildQueryHandler();

export {
  idHandler,
  hashHandler,
  imageHandler,
  authHandler,
  logger,
  queryHandler
};
