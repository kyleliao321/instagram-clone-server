import { Request } from 'express';
import { BadRequestError } from '../../utilities/http-error';
import {
  Controller,
  GetFeedService,
  GetFeedsResponseBody,
  HttpResponse,
  QueryFeed
} from '../../utilities/types';

export default function makeGetFeeds(dependencies: {
  getFeedService: GetFeedService;
}): Controller<HttpResponse<GetFeedsResponseBody>> {
  return async function getFeeds(
    req: Request
  ): Promise<HttpResponse<GetFeedsResponseBody>> {
    const userId = req.query.userId as string;
    const before = req.query.before as string | undefined;
    const after = req.query.after as string | undefined;
    const pageSizeString = req.query.pageSize as string | undefined;

    if (before !== undefined && after !== undefined) {
      throw new BadRequestError(
        'Cursor pagination only allow one curor to be specified.'
      );
    }

    if (pageSizeString !== undefined && isNaN(parseInt(pageSizeString, 10))) {
      throw new BadRequestError('page size only accept integer value.');
    }

    const feeds = await dependencies.getFeedService({
      userId,
      before,
      after,
      pageSize:
        pageSizeString === undefined ? undefined : parseInt(pageSizeString, 10)
    });

    return {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        feeds: feeds.map((feed: QueryFeed) => {
          return Object.freeze({
            userId: feed.userId(),
            userName: feed.userName(),
            userImage: feed.userImage(),
            postId: feed.postId(),
            location: feed.location(),
            timestamp: feed.timestamp(),
            description: feed.description(),
            postImage: feed.postImage()
          });
        })
      }
    };
  };
}
