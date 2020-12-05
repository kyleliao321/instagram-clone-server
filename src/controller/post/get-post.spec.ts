import { GetPostRequestBody, GetPostService } from '../../utilities/types';
import makeGetPost from './get-post';
import { Request } from 'express';

describe('get-post-controller', () => {
  test('should trigger dependecies.getPostService and return correct result when invoke successfully', async () => {
    // given
    const mockId = 'mockId';
    const mockDes = 'mockDes';
    const mockLoc = 'mockLoc';
    const mockTis = 'mockTis';
    const mockImgSrc = 'mockImgSrc';
    const mockPostedUserId = 'mockUserId';

    const mockReq = ({
      body: {
        postId: mockId
      } as GetPostRequestBody
    } as unknown) as Request;

    const getPostService: GetPostService = jest.fn(() =>
      Promise.resolve({
        getId: jest.fn(() => mockId),
        getDescription: jest.fn(() => mockDes),
        getLocation: jest.fn(() => mockLoc),
        getTimeStamp: jest.fn(() => mockTis),
        getImageSrc: jest.fn(() => mockImgSrc),
        getPostedUserId: jest.fn(() => mockPostedUserId)
      })
    );

    const getPost = makeGetPost({ getPostService });

    // when
    const result = await getPost(mockReq);

    // expect
    expect(getPostService).toBeCalledTimes(1);
    expect(result).toStrictEqual({
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
      body: {
        id: mockId,
        description: mockDes,
        location: mockLoc,
        timestamp: mockTis,
        imageSrc: mockImgSrc,
        postedUserId: mockPostedUserId
      }
    });
  });
});
