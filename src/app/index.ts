import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import accountRouter from './routers/account-router';
import userRouter from './routers/user-router';
import postRouter from './routers/post-router';
import relationRouter from './routers/relation-router';
import likeRouter from './routers/like-router';
import { logger } from './infrastructure';
import { join } from 'path';

const app = express();

const imageDir = join(
  process.cwd(),
  'public',
  'images',
  process.env.NODE_ENV || 'development'
);

const swaggerDoc = require('../../swagger.json');

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(bodyParser.json({ limit: '1mb' }));

app.use(
  morgan(
    ':remote-addr :method :url :status :res[content-length] - :response-time ms',
    {
      stream: { write: (message) => logger.info(message) }
    }
  )
);

app.use('/static', express.static(imageDir));

app.use('/api/v1/accounts', accountRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/relations', relationRouter);

app.use('/api/v1/posts', postRouter);

app.use('/api/v1/likes', likeRouter);

export default app;
