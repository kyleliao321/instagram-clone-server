import makeAuthHandler from './auth-handler/auth-handler';
import makeBuildHashHandler from './hash-handler/hash-handler';
import makeIdHandler from './id-handler/id-handler';
import makeBuildImageHandler from './image-handler/image-handler';
import makeLogger from './logger/logger';
// initialize handlers

const idHandler = makeIdHandler();

const buildHashHandler = makeBuildHashHandler();

const buildImageHandler = makeBuildImageHandler({ idHandler });

const authHandler = makeAuthHandler();

const logger = makeLogger();

const hashHandler = buildHashHandler();

const imageHandler = buildImageHandler();

export { idHandler, hashHandler, imageHandler, authHandler, logger };
