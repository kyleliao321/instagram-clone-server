import {
  Controller,
  GetFeedService,
  GetFeedsResponseBody,
  HttpResponse
} from '../../utilities/types';
import makeGetFeeds from './get-feeds';
import { Request } from 'express';
import { BadRequestError } from '../../utilities/http-error';

describe('get-feeds-test', () => {
  test('should throw bad request error when both cursor are provided', async () => {
    // given
    const getFeedService: GetFeedService = jest.fn();
    const getFeeds = makeGetFeeds({ getFeedService });

    const shouldNotBeCalled = jest.fn();

    const req = ({
      query: {
        userId: 'mockUserId',
        before: 'mockBefore',
        after: 'mockAfter'
      }
    } as unknown) as Request;

    // when
    try {
      await getFeeds(req);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestError);
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
  });

  test('should throw bad request pageSize is provided but not as integer value', async () => {
    // given
    const getFeedService: GetFeedService = jest.fn();
    const getFeeds = makeGetFeeds({ getFeedService });

    const shouldNotBeCalled = jest.fn();

    const req = ({
      query: {
        userId: 'mockUserId',
        before: 'mockBefore',
        pageSize: 'pageSize'
      }
    } as unknown) as Request;

    // when
    try {
      await getFeeds(req);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestError);
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
  });
});
