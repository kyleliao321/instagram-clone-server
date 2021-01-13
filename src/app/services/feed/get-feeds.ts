import {
  BuildGetFeedQuery,
  BuildQueryPost,
  GetFeedQueryInfo,
  Post,
  FeedRepository,
  GetFeedService
} from '../../utilities/types';

export default function makeGetFeedService(dependencies: {
  buildGetFeedQuery: BuildGetFeedQuery;
  buildQueryPost: BuildQueryPost;
  feedsRepository: FeedRepository;
}): GetFeedService {
  return async function getFeedService(getFeedInfo: GetFeedQueryInfo) {
    const getFeedQuery = dependencies.buildGetFeedQuery(getFeedInfo);

    let feeds: Post[];

    if (getFeedQuery.before() === null && getFeedQuery.after() === null) {
      feeds = await dependencies.feedsRepository.getLatestFeeds(getFeedQuery);
    } else if (getFeedQuery.before() !== null) {
      feeds = await dependencies.feedsRepository.getPreviousPageFeeds(
        getFeedQuery
      );
    } else {
      feeds = await dependencies.feedsRepository.getNextPageFeeds(getFeedQuery);
    }

    return feeds.map((p: Post) => dependencies.buildQueryPost(p));
  };
}
