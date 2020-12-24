import express from 'express';
import bodyParser from 'body-parser';
import accountRouter from './routers/account-router';
import userRouter from './routers/user-router';
import postRouter from './routers/post-router';
import relationRouter from './routers/relation-router';
import likeRouter from './routers/like-router';

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));

app.use('/api/v1/accounts', accountRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/relations', relationRouter);

app.use('/api/v1/posts', postRouter);

app.use('/api/v1/likes', likeRouter);

export default app;
