import makeGetPosts from './get-posts';
import { Request } from 'express';
import {
  GetPostListService,
  GetPostsRequestBody,
  QueryPost
} from '../../utilities/types';

describe('get-posts-controller', () => {
  test('should trigger getPostListService and return correct result when invoke successfully', async () => {
    // given
    const mockUserId = 'mockUserId';

    const mockReq = ({
      query: {
        userId: mockUserId
      }
    } as unknown) as Request;

    const mockPost: QueryPost = {
      getId: jest.fn(() => 'mockId'),
      getDescription: jest.fn(() => 'mockDes'),
      getLocation: jest.fn(() => null),
      getTimeStamp: jest.fn(() => 'mockTis'),
      getImageSrc: jest.fn(() => 'mockImgSrc'),
      getPostedUserId: jest.fn(() => mockUserId)
    };

    const mockPosts = [mockPost];

    const getPostListService: GetPostListService = jest.fn(() =>
      Promise.resolve(mockPosts)
    );

    const getPosts = makeGetPosts({ getPostListService });

    // when
    const result = await getPosts(mockReq);

    // expect
    expect(getPostListService).toBeCalledTimes(1);
    expect(result.headers).toStrictEqual({
      'Content-Type': 'application/json'
    });
    expect(result.status).toBe(200);

    result.body.posts.forEach((post, index) => {
      const fromQueryPost = mockPosts[index];
      expect(post.id).toBe(fromQueryPost.getId());
      expect(post.description).toBe(fromQueryPost.getDescription());
      expect(post.location).toBe(fromQueryPost.getLocation());
      expect(post.timestamp).toBe(fromQueryPost.getTimeStamp());
      expect(post.imageSrc).toBe(fromQueryPost.getImageSrc());
      expect(post.postedUserId).toBe(fromQueryPost.getPostedUserId());
    });
  });
});
