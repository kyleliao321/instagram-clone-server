import { Request } from 'express';
import { BadRequestError } from '../../utilities/http-error';
import {
  Controller,
  GetFeedService,
  GetFeedsResponseBody,
  HttpResponse,
  QueryPost
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
        feeds: feeds.map((post: QueryPost) => {
          return {
            id: post.getId(),
            description: post.getDescription(),
            location: post.getLocation(),
            timestamp: post.getTimeStamp(),
            imageSrc: post.getImageSrc(),
            postedUserId: post.getPostedUserId()
          };
        })
      }
    };
  };
}
