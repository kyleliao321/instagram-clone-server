import app from './app';
import { logger, db } from './app/infrastructure';

async function initializeDatabase(): Promise<void> {
  logger.info('Settuping database...');

  await db.migrate.latest();

  return db
    .raw('SELECT NOW()')
    .then(() => {
      logger.info('Database is ready...');
    })
    .catch((e) => {
      logger.error(e);
      process.exit();
    });
}

initializeDatabase().then(() => {
  app.listen(8080, () => {
    logger.info('Server started at port 8080...');
  });
});
