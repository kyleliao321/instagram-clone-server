import makeAuthHandler from './auth-handler/auth-handler';
import makeHashHandler from './hash-handler/hash-handler';
import makeIdHandler from './id-handler/id-handler';
import makeImageHandler from './image-handler/image-handler';
import makeLogger from './logger/logger';
import db from './database';

// initialize handlers

const idHandler = makeIdHandler();

const hashHandler = makeHashHandler();

const imageHandler = makeImageHandler();

const authHandler = makeAuthHandler();

const logger = makeLogger();

export { idHandler, hashHandler, imageHandler, authHandler, logger, db };
