import makeDislikePost from './dislike-post';
import { Request } from 'express';
import {
  DislikePostRequestBody,
  DislikePostService,
  QueryUserProfile,
  VerifyTokenService
} from '../../utilities/types';
import { UnauthorizedError } from '../../utilities/http-error';

describe('dislike-post-controller', () => {
  test('should throw an UnauthorizedError when tokenUserId is not compatible with userId in req.body', async () => {
    // given
    const shouldNotBeCalled = jest.fn();

    const mockReq = ({
      headers: {
        authorization: 'mockAuth'
      },
      body: {
        userId: 'mockBodyUserId',
        postId: 'mockPostId'
      } as DislikePostRequestBody
    } as unknown) as Request;

    const verifyTokenService: VerifyTokenService = jest.fn(() => 'mockTokenId');

    const dislikePostService: DislikePostService = jest.fn();

    const dislikePost = makeDislikePost({
      verifyTokenService,
      dislikePostService
    });

    // when
    try {
      await dislikePost(mockReq);
      shouldNotBeCalled();
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedError);
    } finally {
      expect(shouldNotBeCalled).not.toBeCalled();
    }
  });

  test('should trigger dislikePostService and return correct result when invoke successfully', async () => {
    // given
    const shouldNotBeCalled = jest.fn();

    const mockUserId = 'mockUserId';
    const mockPostId = 'mockPostId';
    const mockUserName = 'mockUserName';
    const mockAlias = 'mockAlias';
    const mockDes = 'mockDes';
    const mockImgSrc = ' mockImgSrc';
    const mockPostNum = 0;
    const mockFollowerNum = 0;
    const mockFollowingNum = 0;

    const mockReq = ({
      headers: {
        authorization: 'mockAuth'
      },
      body: {
        userId: mockUserId,
        postId: mockPostId
      } as DislikePostRequestBody
    } as unknown) as Request;

    const verifyTokenService: VerifyTokenService = jest.fn(() => mockUserId);

    const mockQueryUserProfile: QueryUserProfile = {
      getId: jest.fn(() => mockUserId),
      getUserName: jest.fn(() => mockUserName),
      getAlias: jest.fn(() => mockAlias),
      getDescription: jest.fn(() => mockDes),
      getImageSrc: jest.fn(() => mockImgSrc),
      getPostNum: jest.fn(() => mockPostNum),
      getFollowerNum: jest.fn(() => mockFollowerNum),
      getFollowingNum: jest.fn(() => mockFollowingNum)
    };

    const mockLikedUsers = [mockQueryUserProfile];

    const dislikePostService: DislikePostService = jest.fn(() =>
      Promise.resolve(mockLikedUsers)
    );

    const dislikePost = makeDislikePost({
      verifyTokenService,
      dislikePostService
    });

    // when
    const result = await dislikePost(mockReq);

    // expect
    expect(dislikePostService).toBeCalledTimes(1);
    expect(result.headers).toStrictEqual({
      'Content-Type': 'application/json'
    });
    expect(result.status).toBe(201);

    result.body.likedUsers.forEach((userProfile, index) => {
      const fromUserProfile = mockLikedUsers[index];

      expect(userProfile.id).toBe(fromUserProfile.getId());
      expect(userProfile.userName).toBe(fromUserProfile.getUserName());
      expect(userProfile.alias).toBe(fromUserProfile.getAlias());
      expect(userProfile.description).toBe(fromUserProfile.getDescription());
      expect(userProfile.imageSrc).toBe(fromUserProfile.getImageSrc());
      expect(userProfile.postNum).toBe(fromUserProfile.getPostNum());
      expect(userProfile.followerNum).toBe(fromUserProfile.getFollowerNum());
      expect(userProfile.followingNum).toBe(fromUserProfile.getFollowingNum());
    });
  });
});
