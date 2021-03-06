import {
  Feed,
  FeedRepository,
  FeedsDao,
  GetFeedQuery
} from '../../utilities/types';

export default function buildMakeFeedRepository(dependencies: {
  feedsDao: FeedsDao;
}) {
  return function makeFeedRepository(): FeedRepository {
    return Object.freeze({
      getLatestFeeds,
      getNextPageFeeds,
      getPreviousPageFeeds
    });

    async function getLatestFeeds(getFeedQuery: GetFeedQuery): Promise<Feed[]> {
      return await dependencies.feedsDao.getLatest(getFeedQuery);
    }

    async function getNextPageFeeds(
      getFeedQuery: GetFeedQuery
    ): Promise<Feed[]> {
      return await dependencies.feedsDao.getNextPage(getFeedQuery);
    }

    async function getPreviousPageFeeds(
      getFeedQuery: GetFeedQuery
    ): Promise<Feed[]> {
      return await dependencies.feedsDao.getPreviousPage(getFeedQuery);
    }
  };
}
