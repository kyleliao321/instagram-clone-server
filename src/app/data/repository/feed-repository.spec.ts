import { FeedsDao, GetFeedQuery } from '../../utilities/types';
import buildMakeFeedRepository from './feed-repository';

describe('feeds-repository-test', () => {
  test('should invoke feedsDao.getLatest when getLatestFeeds trigger', async () => {
    // given
    const getFeedsQuery: GetFeedQuery = {
      userId: jest.fn(),
      before: jest.fn(),
      after: jest.fn(),
      pageSize: jest.fn()
    };

    const feedsDao: FeedsDao = {
      getLatest: jest.fn(),
      getNextPage: jest.fn(),
      getPreviousPage: jest.fn()
    };

    const makeFeedRepository = buildMakeFeedRepository({ feedsDao });

    const feedsRepository = makeFeedRepository();

    // when
    await feedsRepository.getLatestFeeds(getFeedsQuery);

    // expect
    expect(feedsDao.getLatest).toBeCalledTimes(1);
  });

  test('should invoke feedsDao.getNextPage when getNextPageFeeds trigger', async () => {
    // given
    const getFeedsQuery: GetFeedQuery = {
      userId: jest.fn(),
      before: jest.fn(),
      after: jest.fn(),
      pageSize: jest.fn()
    };

    const feedsDao: FeedsDao = {
      getLatest: jest.fn(),
      getNextPage: jest.fn(),
      getPreviousPage: jest.fn()
    };

    const makeFeedRepository = buildMakeFeedRepository({ feedsDao });

    const feedsRepository = makeFeedRepository();

    // when
    await feedsRepository.getNextPageFeeds(getFeedsQuery);

    // expect
    expect(feedsDao.getNextPage).toBeCalledTimes(1);
  });

  test('should invoke feedsDao.getPreviousPage when getPreviousPageFeeds trigger', async () => {
    // given
    const getFeedsQuery: GetFeedQuery = {
      userId: jest.fn(),
      before: jest.fn(),
      after: jest.fn(),
      pageSize: jest.fn()
    };

    const feedsDao: FeedsDao = {
      getLatest: jest.fn(),
      getNextPage: jest.fn(),
      getPreviousPage: jest.fn()
    };

    const makeFeedRepository = buildMakeFeedRepository({ feedsDao });

    const feedsRepository = makeFeedRepository();

    // when
    await feedsRepository.getPreviousPageFeeds(getFeedsQuery);

    // expect
    expect(feedsDao.getPreviousPage).toBeCalledTimes(1);
  });
});
